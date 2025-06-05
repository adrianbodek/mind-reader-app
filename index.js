const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

// Serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to simulate the "mind reading" action
app.get('/guess/:number', (req, res) => {
    const userNumber = req.params.number;

    // Simulate thinking for 10 seconds
    setTimeout(() => {
        res.send({ guess: userNumber });
    }, 10000); // 10-second delay
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});