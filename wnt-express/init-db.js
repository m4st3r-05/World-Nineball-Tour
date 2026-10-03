const mysql = require('mysql2/promise');

async function initDB() {
    try {
        // Connect without database first to create it
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        });

        await connection.query('CREATE DATABASE IF NOT EXISTS wnt_db');
        console.log('Database "wnt_db" created or already exists.');

        // Use the database
        await connection.query('USE wnt_db');

        // Create Users table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.query(createTableQuery);
        console.log('Table "users" created or already exists.');

        await connection.end();
        console.log('Database initialization successful!');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initDB();
