const express = require('express');
const cors = require('cors');
const vendorRoutes = require('./routes/vendor');
const supplierRoutes = require('./routes/supplier');
const productGroupRoutes = require('./routes/productGroup');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const app = express();

// CORS configuration - Allow all origins for college demo
app.use(cors({
  origin: true, // Allow all origins for simplicity
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/product-groups', productGroupRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MarketConnect API is running' });
});

// Home route
app.get('/', (req, res) => {
  res.json({ 
    name: 'MarketConnect API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      vendors: '/api/vendors',
      suppliers: '/api/suppliers',
      products: '/api/products',
      productGroups: '/api/product-groups',
      orders: '/api/orders'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 MarketConnect Backend running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health\n`);
});