const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const players = [
    { id: 1, name: 'Dương Quốc Hoàng', country: 'VIE', flag: '🇻🇳', rank: 1, points: 1700 },
    { id: 2, name: 'Fedor Gorst', country: 'USA', flag: '🇺🇸', rank: 2, points: 1650 },
    { id: 3, name: 'Mario He', country: 'AUT', flag: '🇦🇹', rank: 3, points: 1605 },
    { id: 4, name: 'Eklent Kaçi', country: 'ALB', flag: '🇦🇱', rank: 4, points: 1550 },
    { id: 5, name: 'Joshua Filler', country: 'GER', flag: '🇩🇪', rank: 5, points: 1490 },
    { id: 6, name: 'Albin Ouschan', country: 'AUT', flag: '🇦🇹', rank: 6, points: 1455 },
    { id: 7, name: 'Jayson Shaw', country: 'SCO', flag: '🏴', rank: 7, points: 1410 },
    { id: 8, name: 'Francisco Sánchez Ruiz', country: 'ESP', flag: '🇪🇸', rank: 8, points: 1380 },
    { id: 9, name: 'Naoyuki Oi', country: 'JPN', flag: '🇯🇵', rank: 9, points: 1340 },
    { id: 10, name: 'Mieszko Fortuński', country: 'POL', flag: '🇵🇱', rank: 10, points: 1310 },
    { id: 11, name: 'Niels Feijen', country: 'NED', flag: '🇳🇱', rank: 11, points: 1275 },
    { id: 12, name: 'Skyler Woodward', country: 'USA', flag: '🇺🇸', rank: 12, points: 1245 },
    { id: 13, name: 'Carlo Biado', country: 'PHI', flag: '🇵🇭', rank: 13, points: 1205 },
    { id: 14, name: 'Max Lechner', country: 'AUT', flag: '🇦🇹', rank: 14, points: 1175 },
    { id: 15, name: 'Mohammed Bedard', country: 'USA', flag: '🇺🇸', rank: 15, points: 1140 },
    { id: 16, name: 'David Alcaide', country: 'ESP', flag: '🇪🇸', rank: 16, points: 1110 },
    { id: 17, name: 'Ralf Souquet', country: 'GER', flag: '🇩🇪', rank: 17, points: 1085 },
    { id: 18, name: 'Wu Kun Lin', country: 'TPE', flag: '🇹🇼', rank: 18, points: 1060 },
    { id: 19, name: 'Kostas Papadopoulos', country: 'GRE', flag: '🇬🇷', rank: 19, points: 1040 },
    { id: 20, name: 'Mickey Krause', country: 'USA', flag: '🇺🇸', rank: 20, points: 1015 },
    { id: 21, name: 'Marc Vidal', country: 'ESP', flag: '🇪🇸', rank: 21, points: 990 },
    { id: 22, name: 'Warren Kiamco', country: 'PHI', flag: '🇵🇭', rank: 22, points: 975 },
    { id: 23, name: 'Brennan Jordan', country: 'USA', flag: '🇺🇸', rank: 23, points: 960 },
    { id: 24, name: 'S. Y. Park', country: 'KOR', flag: '🇰🇷', rank: 24, points: 940 },
    { id: 25, name: 'Alexander Kazakis', country: 'GRE', flag: '🇬🇷', rank: 25, points: 920 },
    { id: 26, name: 'Rodolfo Luat', country: 'PHI', flag: '🇵🇭', rank: 26, points: 900 },
    { id: 27, name: 'Lee Vann Corteza', country: 'PHI', flag: '🇵🇭', rank: 27, points: 885 },
    { id: 28, name: 'Pavel Olegovich', country: 'RUS', flag: '🇷🇺', rank: 28, points: 870 },
    { id: 29, name: 'Sergey Tkach', country: 'UKR', flag: '🇺🇦', rank: 29, points: 850 },
    { id: 30, name: 'John Morra', country: 'CAN', flag: '🇨🇦', rank: 30, points: 830 },
    { id: 31, name: 'Chris Melling', country: 'ENG', flag: '🇬🇧', rank: 31, points: 815 },
    { id: 32, name: 'Harvey Ahlers', country: 'USA', flag: '🇺🇸', rank: 32, points: 800 }
];

const tournaments = [
    { id: 1, name: 'World Pool Championship 2026', short_name: 'WORLD POOL', subtitle: 'CHAMPIONSHIP', date_range: 'Jun 01 - 06, 2026', venue: 'Green Halls', location: 'Jeddah, Saudi Arabia', prize: '$1,000,000', type: 'Major', status: 'Upcoming', image: '/img/world-pool-championship.jpg', hero_image: '/img/world-pool-championship.jpg', race_target: 9 },
    { id: 2, name: 'US Open Pool Championship 2026', short_name: 'US OPEN', subtitle: 'CHAMPIONSHIP', date_range: 'Jun 15 - 20, 2026', venue: 'Las Vegas Convention Center', location: 'Las Vegas, USA', prize: '$600,000', type: 'Ranking', status: 'Upcoming', image: '/img/us-open-pool-championship.jpg', hero_image: '/img/us-open-pool-championship.jpg', race_target: 9 },
    { id: 3, name: 'Hanoi Open Pool Championship 2026', short_name: 'HANOI OPEN', subtitle: 'CHAMPIONSHIP', date_range: 'Jul 12 - 18, 2026', venue: 'Hanoi Indoor Stadium', location: 'Hanoi, Vietnam', prize: '$750,000', type: 'Ranking', status: 'Upcoming', image: '/img/hanoi-open-pool-championship.jpg', hero_image: '/img/hanoi-open-pool-championship.jpg', race_target: 9 },
    { id: 4, name: 'European Open Pool Championship 2026', short_name: 'EUROPEAN OPEN', subtitle: 'CHAMPIONSHIP', date_range: 'Aug 03 - 09, 2026', venue: 'European Arena', location: 'Berlin, Germany', prize: '$500,000', type: 'Ranking', status: 'Upcoming', image: '/img/european-open-pool-championship.jpg', hero_image: '/img/european-open-pool-championship.jpg', race_target: 9 }
];

const seedMatches = () => {
    const rows = [];
    tournaments.forEach((tournament) => {
        for (let i = 0; i < 16; i++) {
            const p1 = players[i * 2];
            const p2 = players[i * 2 + 1];
            const score1 = (i % 3 === 0) ? 9 : ((i % 2 === 0) ? 7 : 6);
            const score2 = (i % 3 === 0) ? 5 : ((i % 2 === 0) ? 4 : 3);
            rows.push({
                tournament_id: tournament.id,
                round_name: 'Round 1',
                round_order: 1,
                player1_id: p1.id,
                player2_id: p2.id,
                score1,
                score2,
                winner_id: p1.id,
                scheduled: `Jul ${20 + i % 5}, ${18 + (i % 4)}:30`,
                venue: 'Main Table',
                is_live: i < 2
            });
        }
    });
    return rows;
};

async function initDB() {
    try {
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: '' });
        await connection.query('CREATE DATABASE IF NOT EXISTS wnt_db');
        await connection.query('USE wnt_db');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS players (
                id INT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                country VARCHAR(50),
                flag VARCHAR(10),
                rank INT,
                points INT
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS tournaments (
                id INT PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                short_name VARCHAR(100),
                subtitle VARCHAR(100),
                date_range VARCHAR(100),
                venue VARCHAR(200),
                location VARCHAR(200),
                prize VARCHAR(50),
                type VARCHAR(50),
                status VARCHAR(50),
                image VARCHAR(255),
                hero_image VARCHAR(255),
                race_target INT
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS matches (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tournament_id INT,
                round_name VARCHAR(100),
                round_order INT,
                player1_id INT,
                player2_id INT,
                score1 INT DEFAULT 0,
                score2 INT DEFAULT 0,
                winner_id INT NULL,
                scheduled VARCHAR(100),
                venue VARCHAR(100),
                is_live BOOLEAN DEFAULT FALSE,
                FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
                FOREIGN KEY (player1_id) REFERENCES players(id),
                FOREIGN KEY (player2_id) REFERENCES players(id),
                FOREIGN KEY (winner_id) REFERENCES players(id)
            )
        `);

        await connection.query('DELETE FROM matches');
        await connection.query('DELETE FROM tournaments');
        await connection.query('DELETE FROM players');

        for (const player of players) {
            await connection.query(
                'INSERT INTO players (id, name, country, flag, rank, points) VALUES (?, ?, ?, ?, ?, ?)',
                [player.id, player.name, player.country, player.flag, player.rank, player.points]
            );
        }

        for (const tournament of tournaments) {
            await connection.query(
                'INSERT INTO tournaments (id, name, short_name, subtitle, date_range, venue, location, prize, type, status, image, hero_image, race_target) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [tournament.id, tournament.name, tournament.short_name, tournament.subtitle, tournament.date_range, tournament.venue, tournament.location, tournament.prize, tournament.type, tournament.status, tournament.image, tournament.hero_image, tournament.race_target]
            );
        }

        const matches = seedMatches();
        for (const match of matches) {
            await connection.query(
                'INSERT INTO matches (tournament_id, round_name, round_order, player1_id, player2_id, score1, score2, winner_id, scheduled, venue, is_live) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [match.tournament_id, match.round_name, match.round_order, match.player1_id, match.player2_id, match.score1, match.score2, match.winner_id, match.scheduled, match.venue, match.is_live ? 1 : 0]
            );
        }

        const [adminRows] = await connection.query('SELECT * FROM users WHERE username = ?', ['admin']);
        if (adminRows.length === 0) {
            const hashed = await bcrypt.hash('1', 10);
            await connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', hashed, 'admin']);
            console.log('Created default admin account: username=admin, password=1');
        } else {
            const hashed = await bcrypt.hash('1', 10);
            await connection.query('UPDATE users SET password = ?, role = ? WHERE username = ?', [hashed, 'admin', 'admin']);
            console.log('Updated admin account: username=admin, password=1');
        }

        console.log('Database initialized with players, tournaments, match seeds and admin account.');
        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initDB();
