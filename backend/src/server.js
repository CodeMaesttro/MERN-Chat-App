import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import messageRouter from './routes/message.route.js';
import connectDB from './lib/db.js'
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Allow server to understand json data
app.use(cookieParser()); // Allows server to parse cookies

// Connect to MongoDB
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent with requests
    })); //Allow frontend to com wit backend



app.get('/', (req, res) => {
    res.send('API is runnin ...')
})

app.use('/api/auth', authRouter); // Use authRouter for authentication routes

app.use('/api/message', messageRouter); // Use messageRouter for messaging routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB();    
})