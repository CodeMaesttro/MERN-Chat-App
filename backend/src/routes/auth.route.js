// Import required packages
import express from 'express';
import { signOut, registerUser, signIn, getMe, updateProfile } from '../controllers/auth.controllers.js';
import auth from '../middleware/auth.js';


// Create router
const authRouter = express.Router();

// Sign Up route post /api/auth/sign-up
authRouter.post('/sign-up', registerUser);

// Sign In route post /api/auth/sign-in
authRouter.post('/sign-in', signIn);

// post /api/auth/logout
authRouter.get('/sign-out', auth, signOut);

// Get current user route get /api/auth/me
authRouter.get('/get-me', auth, getMe);

// update user
authRouter.put('/updateProfile', auth, updateProfile);




export default authRouter;