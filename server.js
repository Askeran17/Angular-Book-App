require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createProxyMiddleware } = require('http-proxy-middleware');
const compression = require('compression');
const http = require('http');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(compression());

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

// API routes for authentication (handled by Node.js)
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
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

// Protected route example
app.get('/api/protected', (req, res) => {
  res.send('This is a protected route');
});

// Proxy API requests to .NET Core server
app.use('/api', createProxyMiddleware({
  target: process.env.API_URL || 'http://localhost:5089', // URL вашего .NET сервера
  changeOrigin: true,
  logLevel: 'debug', // Добавьте это для логирования
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  }
}));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Api/wwwroot/index.html'));
});

// Start the app by listening on the default port
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`ASPNETCORE_ENVIRONMENT: ${process.env.ASPNETCORE_ENVIRONMENT}`);
});


