const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const pool = require('./config/db');
const fallbackData = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'wnt-secret-key-123',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('<h1>403 Forbidden</h1><p>Bạn không có quyền truy cập trang này!</p><a href="/">Về trang chủ</a>');
    }
};

function normalizeTournament(row = {}) {
    const fallback = fallbackData.tournaments.find((item) => item.id === Number(row.id)) || {};

    return {
        ...row,
        id: Number(row.id ?? fallback.id ?? 0),
        name: row.name || fallback.name || 'Tournament',
        shortName: row.short_name || row.shortName || fallback.shortName || row.name || 'TOURNAMENT',
        subtitle: row.subtitle || fallback.subtitle || 'CHAMPIONSHIP',
        date: row.date || row.date_range || fallback.date || fallback.dateRange || '',
        dateRange: row.date_range || row.dateRange || fallback.dateRange || fallback.date || '',
        venue: row.venue || fallback.venue || 'TBD',
        location: row.location || fallback.location || 'TBD',
        prize: row.prize || fallback.prize || '$0',
        type: row.type || fallback.type || 'Ranking',
        status: row.status || fallback.status || 'Upcoming',
        image: row.image || row.hero_image || fallback.image || fallback.heroImage || '',
        heroImage: row.hero_image || row.heroImage || fallback.heroImage || fallback.image || '',
        raceTarget: Number(row.race_target ?? row.raceTarget ?? fallback.raceTarget ?? 9),
        prizeBreakdown: Array.isArray(row.prizeBreakdown) ? row.prizeBreakdown : (fallback.prizeBreakdown || []),
        matches: Array.isArray(row.matches) ? row.matches : (fallback.matches || []),
        participants: Array.isArray(row.participants) ? row.participants : (fallback.participants || [])
    };
}

function normalizePlayer(row = {}) {
    const fallback = fallbackData.players.find((player) => player.id === Number(row.id)) || {};
    return {
        ...fallback,
        ...row,
        portrait: row.portrait || fallback.portrait || null
    };
}

async function getPlayers() {
    try {
        const [rows] = await pool.query('SELECT * FROM players ORDER BY rank ASC');
        return rows.length ? rows.map(normalizePlayer) : fallbackData.players;
    } catch (error) {
        return fallbackData.players;
    }
}

async function getTournaments() {
    try {
        const [rows] = await pool.query('SELECT * FROM tournaments ORDER BY id ASC');
        return rows.length ? rows.map(normalizeTournament) : fallbackData.tournaments;
    } catch (error) {
        return fallbackData.tournaments;
    }
}

function groupMatchesByRound(matches, raceTarget = 9) {
    const grouped = new Map();
    matches.forEach((match) => {
        const key = match.round_name || 'Round 1';
        if (!grouped.has(key)) {
            grouped.set(key, { label: `ROUND ${match.round_order || 1} - RACE TO ${raceTarget}`, matches: [] });
        }
        grouped.get(key).matches.push({
            id: match.id,
            round: match.round_name || 'Round 1',
            roundLabel: `ROUND ${match.round_order || 1} - RACE TO ${raceTarget}`,
            player1: {
                id: match.player1_id,
                name: match.p1_name,
                country: match.p1_country,
                rank: match.p1_rank || 0,
                portrait: normalizePlayer({ id: match.player1_id }).portrait
            },
            player2: {
                id: match.player2_id,
                name: match.p2_name,
                country: match.p2_country,
                rank: match.p2_rank || 0,
                portrait: normalizePlayer({ id: match.player2_id }).portrait
            },
            score1: Number(match.score1 || 0),
            score2: Number(match.score2 || 0),
            scheduled: match.scheduled || 'TBD',
            venue: match.venue || 'Main Table',
            is_live: Boolean(match.is_live)
        });
    });
    return Array.from(grouped.values());
}

async function getTournamentDetailById(id) {
    try {
        const [tournaments] = await pool.query('SELECT * FROM tournaments WHERE id = ?', [id]);
        const tournament = tournaments[0];
        if (!tournament) return null;

        const [matches] = await pool.query(`
            SELECT m.*, 
                   p1.name AS p1_name,
                   p1.country AS p1_country,
                   p1.rank AS p1_rank,
                   p2.name AS p2_name,
                   p2.country AS p2_country,
                   p2.rank AS p2_rank
            FROM matches m
            LEFT JOIN players p1 ON p1.id = m.player1_id
            LEFT JOIN players p2 ON p2.id = m.player2_id
            WHERE m.tournament_id = ?
            ORDER BY m.round_order ASC, m.id ASC
        `, [id]);

        const fallbackTournament = fallbackData.tournaments.find((item) => item.id === Number(id));
        const normalizedTournament = normalizeTournament(tournament);
        normalizedTournament.participants = await getPlayers();
        normalizedTournament.matches = matches.length ? groupMatchesByRound(matches, normalizedTournament.raceTarget || 9) : (fallbackTournament ? fallbackTournament.matches : []);
        normalizedTournament.prizeBreakdown = normalizedTournament.prizeBreakdown.length ? normalizedTournament.prizeBreakdown : (fallbackTournament ? fallbackTournament.prizeBreakdown : []);
        return normalizedTournament;
    } catch (error) {
        return fallbackData.tournaments.find((item) => item.id === Number(id)) || null;
    }
}

async function getAdminMatches() {
    try {
        const [rows] = await pool.query(`
            SELECT m.*, 
                   p1.name AS p1_name,
                   p2.name AS p2_name,
                   t.name AS tournament_name
            FROM matches m
            LEFT JOIN players p1 ON p1.id = m.player1_id
            LEFT JOIN players p2 ON p2.id = m.player2_id
            LEFT JOIN tournaments t ON t.id = m.tournament_id
            ORDER BY m.tournament_id, m.round_order, m.id
        `);
        return rows;
    } catch (error) {
        return [];
    }
}

app.get('/', async (req, res) => {
    const tournaments = await getTournaments();
    const players = await getPlayers();
    res.render('index', {
        title: 'Trang Chủ',
        tournaments,
        topPlayers: players.slice(0, 4)
    });
});

app.get('/tournaments', async (req, res) => {
    const tournaments = await getTournaments();
    res.render('tournaments', { title: 'Giải Đấu', tournaments });
});

app.get('/tournaments/:id', async (req, res) => {
    const tournament = await getTournamentDetailById(req.params.id);
    if (!tournament) return res.status(404).send('<h1>404 - Không tìm thấy giải đấu</h1>');
    res.render('tournament-detail', {
        title: tournament.name,
        tournament
    });
});

app.get('/rankings', async (req, res) => {
    const players = (await getPlayers())
        .slice()
        .sort((a, b) => Number(a.rank || 0) - Number(b.rank || 0))
        .slice(0, 32);
    res.render('rankings', { title: 'Bảng Xếp Hạng', players });
});

app.get('/admin', isAdmin, async (req, res) => {
    const tournaments = await getTournaments();
    const players = await getPlayers();
    const tournamentMatches = await getAdminMatches();
    res.render('admin', {
        title: 'Bảng Quản Trị WNT',
        tournaments,
        players,
        tournamentMatches
    });
});

app.post('/admin/matches/:id/score', isAdmin, async (req, res) => {
    const score1 = Number(req.body.score1 || 0);
    const score2 = Number(req.body.score2 || 0);
    const isLive = req.body.is_live === 'on' || req.body.is_live === '1' || req.body.is_live === 1 ? 1 : 0;
    await pool.query('UPDATE matches SET score1 = ?, score2 = ?, is_live = ? WHERE id = ?', [score1, score2, isLive, req.params.id]);
    res.redirect('/admin');
});

app.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('login', { title: 'Đăng Nhập', error: null });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.render('login', { title: 'Đăng Nhập', error: 'Sai tài khoản hoặc mật khẩu!' });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.user = { username: user.username, role: user.role };
            return res.redirect('/');
        }
        return res.render('login', { title: 'Đăng Nhập', error: 'Sai tài khoản hoặc mật khẩu!' });
    } catch (err) {
        console.error(err);
        res.render('login', { title: 'Đăng Nhập', error: 'Lỗi máy chủ' });
    }
});

app.get('/register', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('register', { title: 'Đăng Ký', error: null });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.render('register', { title: 'Đăng Ký', error: 'Vui lòng nhập đủ thông tin' });

    try {
        const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.render('register', { title: 'Đăng Ký', error: 'Tên tài khoản đã tồn tại' });
        }

        const hashed = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);

        req.session.user = { username: username, role: 'user' };
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('register', { title: 'Đăng Ký', error: 'Lỗi máy chủ' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
