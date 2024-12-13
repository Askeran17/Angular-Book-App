const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Api/wwwroot directory
app.use(express.static(path.join(__dirname, 'Api/wwwroot')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Api/wwwroot/index.html'));
});

// Start the app by listening on the default Render port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

