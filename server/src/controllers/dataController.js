import pool from '../config/db.js';

// POST /api/data
const createReading = async (req, res) => {
  try {
    const {
      device_id,
      voltage,
      current,
      power,
      energy,
      frequency,
      pf,
      valid,
      esp_timestamp,
    } = req.body;

    // Basic validation
    if (!device_id) {
      return res.status(400).json({
        success: false,
        message: 'device_id is required',
      });
    }

    const query = `
      INSERT INTO readings (
        device_id,
        voltage,
        current,
        power,
        energy,
        frequency,
        pf,
        valid,
        esp_timestamp
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *;
    `;

    const values = [
      device_id,
      voltage,
      current,
      power,
      energy,
      frequency,
      pf,
      valid,
      esp_timestamp,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Create Reading Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// GET /api/data
const getAllReadings = async (req, res) => {
  try {
    const query = `
      SELECT * FROM readings
      ORDER BY created_at DESC
      LIMIT 100;
    `;

    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error('Fetch Readings Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// GET /api/data/:deviceId
const getReadingsByDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const query = `
      SELECT * FROM readings
      WHERE device_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await pool(query, [deviceId]);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error('Device Readings Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export { createReading, getAllReadings, getReadingsByDevice };
