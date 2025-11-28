/**
 * Database Migration Script
 * Run this to add missing columns to the suppliers table
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'marketconnect.db');
const db = new sqlite3.Database(dbPath);

const columnsToAdd = [
  { name: 'license_number', type: 'TEXT' },
  { name: 'years_in_business', type: 'TEXT' },
  { name: 'employee_count', type: 'TEXT' },
  { name: 'whatsapp_business', type: 'TEXT' },
  { name: 'food_safety_license', type: 'TEXT' },
  { name: 'organic_certification', type: 'TEXT' },
  { name: 'iso_certification', type: 'TEXT' },
  { name: 'export_license', type: 'TEXT' }
];

console.log('🔧 Starting database migration...\n');

// Check existing columns and add missing ones
db.all("PRAGMA table_info(suppliers)", [], (err, columns) => {
  if (err) {
    console.error('Error getting table info:', err.message);
    db.close();
    return;
  }

  const existingColumns = columns.map(col => col.name);
  console.log('Existing columns:', existingColumns.join(', '));
  console.log('');

  let pendingMigrations = 0;
  let completedMigrations = 0;

  columnsToAdd.forEach(column => {
    if (!existingColumns.includes(column.name)) {
      pendingMigrations++;
      const sql = `ALTER TABLE suppliers ADD COLUMN ${column.name} ${column.type}`;
      
      db.run(sql, [], function(err) {
        completedMigrations++;
        if (err) {
          console.error(`❌ Failed to add column ${column.name}:`, err.message);
        } else {
          console.log(`✅ Added column: ${column.name}`);
        }

        if (completedMigrations === pendingMigrations) {
          console.log('\n✅ Migration complete!');
          db.close();
        }
      });
    } else {
      console.log(`⏭️  Column ${column.name} already exists`);
    }
  });

  if (pendingMigrations === 0) {
    console.log('\n✅ No migrations needed - all columns exist!');
    db.close();
  }
});
