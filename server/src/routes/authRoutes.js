import { Router } from 'express';

const router = Router();

import { register, login } from '../controllers/authController.js';

// register
router.post('/register', register);

// login
router.get('/login', login);

export default router;
