const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React build output directory
app.use(express.static(path.join(__dirname, 'build')));

// Redirect all requests to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/main/webapp', 'index.html'));
});

// Listen on a specific port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
