




import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './Utils/db.js';
import userRoutes from './Routes/user.route.js';
import postRoutes from './Routes/post.route.js';

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('okay');
});

// Server
const PORT = process.env.PORT || 7000;
const server = async ()=>{
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
  });
}
server()