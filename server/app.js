import express, { json } from 'express';
import cors from 'cors';
import dataRoutes from './src/routes/dataRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import deviceRoutes from './src/routes/deviceRoutes.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // frontend url
    credentials: true,
  })
);

app.use(json());

app.use('/api/data', dataRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/device', deviceRoutes);

export default app;
