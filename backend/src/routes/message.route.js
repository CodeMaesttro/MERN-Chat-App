import express from 'express';
import { sendMessage, getMessages, getConversations } from '../controllers/message.controllers.js';
import auth from '../middleware/auth.js'; // ✅ import auth middleware

const messageRouter = express.Router();

//  Protected route to send a message
messageRouter.post('/send', auth, sendMessage);

//  Get messages between authenticated user and userId
messageRouter.get('/:userId', auth, getMessages);

// Get all conversations for authenticated user
messageRouter.get('/', auth, getConversations);

export default messageRouter;
