import express from 'express';
import { signUp, signIn, logout } from '../controllers/auth.controllers.js'; // ✅ import logout


const authRouter = express.Router();

// Routes
authRouter.post('/sign-up', signUp); 
authRouter.post('/sign-in', signIn);
authRouter.post('/logout', logout); // ✅ logout route

export default authRouter;
