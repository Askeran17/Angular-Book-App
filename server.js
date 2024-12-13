const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, 'src')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

// Start the app by listening on the default Render port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

