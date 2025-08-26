import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './routes/user.js';
import addressRouter from './routes/address.js';
import { dbConnection } from './utils/dbConnection.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, 
}));
app.use(cookieParser());

// Routes
app.use('/api', userRouter);
app.use('/api', addressRouter);

dbConnection();

app.listen(process.env.PORT || 8000, () => {
  console.log(`✅ Connected to port ${process.env.PORT || 8000}`);
});
