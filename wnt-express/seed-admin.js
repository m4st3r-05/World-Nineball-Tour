const bcrypt = require('bcrypt');
const pool = require('./config/db');

async function seedAdmin() {
    try {
        const username = 'admin';
        const password = '1'; // Mật khẩu cho admin
        const role = 'admin';

        // Check if admin already exists
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length > 0) {
            // Update existing admin to ensure it has the correct role and password
            const hashed = await bcrypt.hash(password, 10);
            await pool.query('UPDATE users SET role = ?, password = ? WHERE username = ?', [role, hashed, username]);
            console.log('Admin user updated successfully.');
        } else {
            // Insert new admin
            const hashed = await bcrypt.hash(password, 10);
            await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashed, role]);
            console.log('Admin user created successfully.');
        }
        
        console.log('Tài khoản admin: admin | Mật khẩu: adminpassword');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
