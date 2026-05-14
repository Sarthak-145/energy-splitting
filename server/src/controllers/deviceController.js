import { query as _query } from '../config/db.js';

// USER toggles relay
const toggleRelay = async (req, res) => {
  try {
    const { id } = req.params;
    const { relay_state } = req.body;

    const query = `
      UPDATE devices
      SET relay_state = $1
      WHERE id = $2
      RETURNING *;
    `;

    const result = await _query(query, [relay_state, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Toggle Relay Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// ESP32 fetches latest command
const getRelayCommand = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT relay_state
      FROM devices
      WHERE id = $1;
    `;

    const result = await _query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Device not found',
      });
    }

    res.status(200).json({
      success: true,
      relay: result.rows[0].relay_state,
    });
  } catch (error) {
    console.error('Get Relay Command Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export default {
  toggleRelay,
  getRelayCommand,
};
