import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // ✅ Import cookie-parser

import connectDB from './lib/db.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js'; // Import message routes

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());               // Parse incoming JSON
app.use(cors({
  origin: 'http://localhost:5173',    // Change this to your frontend URL
  credentials: true                   // Allow cookies to be sent
}));
app.use(cookieParser());              // ✅ Parse cookies from requests

// ✅ Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/api/auth", authRouter);     // Auth routes
app.use("/api/messages", messageRouter); // Message routes

// ✅ Connect DB first, then start server
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB:', err.message);
    process.exit(1); // Exit app
  });
