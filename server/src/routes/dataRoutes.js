import { Router } from 'express';

const router = Router();

import {
  createReading,
  getAllReadings,
  getReadingsByDevice,
} from '../controllers/dataController';

// POST sensor data
router.post('/', createReading);

// GET all readings
router.get('/', getAllReadings);

// GET readings by device
router.get('/:deviceId', getReadingsByDevice);

export default router;
