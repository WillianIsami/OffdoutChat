import express from 'express';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
  origin: `${process.env.CORS_URL}`,
  optionsSuccessStatus: 200
}))

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

export default app;