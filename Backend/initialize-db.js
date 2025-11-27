/**
 * MarketConnect Database Setup
 * College Project - B2B Marketplace
 * 
 * This file handles SQLite database initialization and provides
 * a simple query function for database operations.
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'marketconnect.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

/**
 * Initialize all database tables
 */
const initializeDatabase = () => {
  console.log('📦 Initializing database tables...\n');
  
  db.serialize(() => {
    
    // ============================================
    // VENDORS TABLE - Stores vendor/buyer profiles
    // ============================================
    db.run(`CREATE TABLE IF NOT EXISTS vendors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firebase_user_id TEXT,
      full_name TEXT NOT NULL,
      mobile_number TEXT NOT NULL,
      language_preference TEXT DEFAULT 'English',
      stall_name TEXT,
      stall_address TEXT NOT NULL,
      city TEXT NOT NULL,
      pincode TEXT NOT NULL,
      state TEXT NOT NULL,
      stall_type TEXT NOT NULL,
      raw_material_needs TEXT,
      preferred_delivery_time TEXT,
      latitude TEXT,
      longitude TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating vendors table:', err.message);
      else console.log('✓ Vendors table ready');
    });

    // ============================================
    // SUPPLIERS TABLE - Stores supplier profiles
    // ============================================
    db.run(`CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firebase_user_id TEXT UNIQUE,
      full_name TEXT NOT NULL,
      mobile_number TEXT NOT NULL,
      language_preference TEXT DEFAULT 'English',
      business_name TEXT,
      business_address TEXT NOT NULL,
      city TEXT NOT NULL,
      pincode TEXT NOT NULL,
      state TEXT NOT NULL,
      business_type TEXT NOT NULL,
      supply_capabilities TEXT,
      preferred_delivery_time TEXT,
      primary_email TEXT,
      gst_number TEXT,
      minimum_order_value TEXT,
      delivery_time TEXT,
      payment_terms TEXT,
      service_areas TEXT,
      latitude TEXT,
      longitude TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating suppliers table:', err.message);
      else console.log('✓ Suppliers table ready');
    });

    // ============================================
    // PRODUCTS TABLE - Product catalog
    // ============================================
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier_id INTEGER,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      price REAL NOT NULL,
      unit TEXT DEFAULT 'kg',
      stock_quantity INTEGER DEFAULT 0,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
    )`, (err) => {
      if (err) console.error('Error creating products table:', err.message);
      else console.log('✓ Products table ready');
    });

    // ============================================
    // PRODUCT GROUPS TABLE - Group buying offers
    // ============================================
    db.run(`CREATE TABLE IF NOT EXISTS product_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      quantity TEXT NOT NULL,
      price TEXT,
      actual_rate TEXT,
      final_rate TEXT,
      discount_percentage TEXT,
      location TEXT NOT NULL,
      deadline DATETIME NOT NULL,
      status TEXT DEFAULT 'pending',
      created_by INTEGER NOT NULL,
      latitude TEXT,
      longitude TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES suppliers(id)
    )`, (err) => {
      if (err) console.error('Error creating product_groups table:', err.message);
      else console.log('✓ Product groups table ready');
    });

    // ============================================
    // ORDERS TABLE - Customer orders
    // ============================================
    db.run(`CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      vendor_id INTEGER NOT NULL,
      supplier_id INTEGER,
      order_type TEXT DEFAULT 'individual',
      items TEXT NOT NULL,
      subtotal REAL DEFAULT 0,
      tax REAL DEFAULT 0,
      delivery_charge REAL DEFAULT 0,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      payment_status TEXT DEFAULT 'pending',
      payment_method TEXT DEFAULT 'cod',
      delivery_address TEXT,
      delivery_date TEXT,
      notes TEXT,
      customer_details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (vendor_id) REFERENCES vendors(id),
      FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
    )`, (err) => {
      if (err) console.error('Error creating orders table:', err.message);
      else console.log('✓ Orders table ready');
    });

    console.log('\n✅ Database initialization complete!\n');
  });
};

/**
 * Execute a database query
 * @param {string} sql - SQL query string
 * @param {array} params - Query parameters
 * @returns {Promise} - Resolves with query results
 */
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    const isModifyQuery = sql.toLowerCase().match(/^(insert|update|delete)/);
    
    if (isModifyQuery) {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ 
          lastID: this.lastID, 
          changes: this.changes,
          rows: [{ id: this.lastID }] 
        });
      });
    } else {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve({ rows });
      });
    }
  });
};

// Initialize database on module load
initializeDatabase();

// Export for use in routes
module.exports = { initializeDatabase, query, db };