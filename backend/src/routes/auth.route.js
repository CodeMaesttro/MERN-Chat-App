// Import required packages
import express from 'express';
import  {signOut, signUp, signIn, getMe, updateProfile, checkAuth} from '../controllers/auth.controllers.js';
import auth from '../middleware/auth.js';


// Create router
const authRouter = express.Router();

// Sign Up route post /api/auth/sign-up
authRouter.post('/sign-up', signUp);

// Sign In route post /api/auth/sign-in
authRouter.post('/log-in', signIn);

// post /api/auth/logout
authRouter.post('/log-out', auth, signOut);

// Get current user route get /api/auth/me
authRouter.get('/get-me', auth, getMe);

// update user
authRouter.put('/update-profile', auth, updateProfile);

authRouter.get('/check', auth, checkAuth);


export default authRouter;
