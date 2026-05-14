import { Router } from 'express';

const router = Router();

import {
  toggleRelay,
  getRelayCommand,
} from '../controllers/deviceController.js';

// USER controls relay
router.post('/:id/toggle', toggleRelay);

// ESP32 fetches command
router.get('/:id/command', getRelayCommand);

export default router;
