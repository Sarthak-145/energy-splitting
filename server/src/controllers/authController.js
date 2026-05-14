import pool from '../config/db.js';

import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password, room_id } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    // Check existing user
    const existingUser = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Insert user
    const query = `
      INSERT INTO users (
        name,
        email,
        password,
        room_id
      )
      VALUES ($1,$2,$3,$4)
      RETURNING id, name, email, room_id, created_at;
    `;

    const values = [name, email, hashedPassword, room_id || null];

    const result = await pool.query(query, values);

    const user = result.rows[0];

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error('Register Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required',
      });
    }

    // Find user
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        room_id: user.room_id,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export { register, login };
