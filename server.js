const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve all static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Path to store scores
const DATA_DIR = path.join(__dirname, 'data');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');

// Ensure data folder and scores file exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}
if (!fs.existsSync(SCORES_FILE)) {
    fs.writeFileSync(SCORES_FILE, JSON.stringify([]));
}

// Helper to read scores
function getScores() {
    try {
        const raw = fs.readFileSync(SCORES_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

// GET /api/leaderboard — returns top 10 scores
app.get('/api/leaderboard', (req, res) => {
    const scores = getScores();
    scores.sort((a, b) => b.score - a.score);
    res.json(scores.slice(0, 10));
});

// POST /api/score — saves a player's score
app.post('/api/score', (req, res) => {
    const { name, score, rankTitle } = req.body;

    if (!name || typeof score !== 'number') {
        return res.status(400).json({ error: 'Name and numeric score are required.' });
    }

    const scores = getScores();
    const newEntry = {
        name: name.trim().slice(0, 20),
        score,
        rankTitle: rankTitle || 'Wandering Traveler',
        date: new Date().toISOString()
    };

    scores.push(newEntry);
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));

    res.status(201).json({ message: 'Score saved successfully!', entry: newEntry });
});

// Fallback to index.html for root path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Paryatak server is running on port ${PORT}`);
});