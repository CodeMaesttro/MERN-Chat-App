import express from 'express';
import { checkAuth, signIn, SignOut, signUp } from '../controllers/auth.controllers.js';
import auth from '../middlewares/auth.middleware.js';

// Import the user controller
const authRouter = express.Router();

authRouter.post('/sign-up', signUp);

authRouter.post('/sign-in', signIn);

authRouter.get('/sign-out', auth, SignOut);

authRouter.get('/check', auth, checkAuth);

export default authRouter;
