// src/api/server.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// In-memory data storage
let invoices = [
  // ... (existing invoice data)
];

// In-memory user database
const users = [
  { id: 1, username: 'admin', password: 'password' },
];

const JWT_SECRET = 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());

// API endpoint for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

// API endpoint to fetch invoices (secured)
app.get('/api/invoices', verifyToken, (req, res) => {
  res.json(invoices);
});

// API endpoint to create a new invoice (secured)
app.post('/api/invoices', verifyToken, (req, res) => {
  const { customer, amount } = req.body;
  const newInvoice = {
    id: invoices.length + 1,
    invoiceNumber: `INV00${invoices.length + 1}`,
    customer,
    date: new Date().toISOString().split('T')[0],
    amount,
  };

  invoices.push(newInvoice);
  res.json(newInvoice);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});