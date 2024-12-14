const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Middleware
app.use(bodyParser.json());

// Serve static files from the Api/wwwroot directory
app.use(express.static(path.join(__dirname, 'Api/wwwroot')));

// In-memory user storage (for demonstration purposes)
const users = [];

// Register admin user
const registerAdmin = () => {
  const username = 'admin';
  const password = 'admin';
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });
  console.log('Admin user registered');
};

registerAdmin();

// Proxy API requests to .NET Core server
app.use('/api', createProxyMiddleware({
    target: process.env.API_URL || 'http://localhost:5089', // URL вашего .NET Core сервера
    changeOrigin: true,
}));

// API routes for authentication (handled by Node.js)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });
  res.status(201).send('User registered');
});

app.get('/api/protected', (req, res) => {
  res.send('This is a protected route');
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Api/wwwroot/index.html'));
});

// Start the app by listening on the default Render port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


