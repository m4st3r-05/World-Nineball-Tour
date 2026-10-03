const express = require('express');
const path = require('path');
const mockData = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/rankings', (req, res) => {
    res.render('rankings', { 
        title: 'Bảng Xếp Hạng',
        players: mockData.players 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
