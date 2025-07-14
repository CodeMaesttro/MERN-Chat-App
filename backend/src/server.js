import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './lib/db.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors("*"));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8000;

// ✅ First connect to DB, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB:', err.message);
    process.exit(1); // Force quit the app
  });
