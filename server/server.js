import dotenv from 'dotenv';
import pool from './src/config/db.js';
import app from './app.js';

dotenv.config();

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB connected', res.rows[0]);
  } catch (err) {
    console.error('DB connection failed', err.message);
    process.exit(1);
  }
})();

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on port ${port}`);
});
