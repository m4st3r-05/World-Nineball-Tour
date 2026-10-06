const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const pool = require('./config/db');
const mockData = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure Session
app.use(session({
    secret: 'wnt-secret-key-123',
    resave: false,
    saveUninitialized: true
}));

// Pass user session to all EJS views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Middleware to protect Admin Routes
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('<h1>403 Forbidden</h1><p>Bạn không có quyền truy cập trang này!</p><a href="/">Về trang chủ</a>');
    }
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Trang Chủ',
        tournaments: mockData.tournaments,
        topPlayers: mockData.players.slice(0, 4)
    });
});

app.get('/tournaments', (req, res) => {
    res.render('tournaments', { 
        title: 'Giải Đấu',
        tournaments: mockData.tournaments 
    });
});

app.get('/tournaments/:id', (req, res) => {
    const tournament = mockData.tournaments.find(t => t.id === parseInt(req.params.id));
    if (!tournament) return res.status(404).send('<h1>404 - Không tìm thấy giải đấu</h1>');
    res.render('tournament-detail', {
        title: tournament.name,
        tournament
    });
});

app.get('/rankings', (req, res) => {
    res.render('rankings', { 
        title: 'Bảng Xếp Hạng',
        players: mockData.players 
    });
});

// Admin Dashboard Route
app.get('/admin', isAdmin, (req, res) => {
    res.render('admin', { 
        title: 'Bảng Quản Trị WNT',
        tournaments: mockData.tournaments,
        players: mockData.players
    });
});

// Auth Routes
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
        } else {
            return res.render('login', { title: 'Đăng Nhập', error: 'Sai tài khoản hoặc mật khẩu!' });
        }
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
