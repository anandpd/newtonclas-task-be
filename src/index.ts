import 'dotenv/config'
import logger from './utils/logger';
import connectDB from './utils/db';
import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connectDB();
app.listen(PORT, () => logger.info(`Server is running on port ${PORT} OK`));
