import pool from './database';

async function createTables() {
  const connection = await pool.getConnection();

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('manager', 'forklift_driver', 'production_leader', 'quality_inspector', 'machine_operator') NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS job_orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(255) NOT NULL UNIQUE,
        product_name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        status ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS pallets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_order_id INT,
        qr_code VARCHAR(255) NOT NULL UNIQUE,
        status ENUM('produced', 'quality_checked', 'in_warehouse') NOT NULL DEFAULT 'produced',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_order_id) REFERENCES job_orders(id)
      )
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    connection.release();
  }
}

createTables();