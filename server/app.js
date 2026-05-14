import express, { json } from 'express';
import dataRoutes from './src/routes/dataRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

app.use(json());

app.use('/api/data', dataRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/device', deviceRoutes);

export default app;
