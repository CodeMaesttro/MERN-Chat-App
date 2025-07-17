import express from 'express';
import { sendMessage, getMessages, getConversations, deleteMessage, getMessageInfo } from '../controllers/message.controllers.js';
import auth from '../middleware/auth.js';

const messageRouter = express.Router();

messageRouter.post('/send-message', auth, sendMessage); // Route to send a new message
messageRouter.get('/convo', auth, getConversations); // Route to get conversations for the current user

messageRouter.get('/:userId', auth, getMessages); // Route to get messages 


messageRouter.delete('/:messageId', auth, deleteMessage); // Route to delete a message

messageRouter.get('/messageId', auth, getMessageInfo); // Route to get all conversations for the current user

export default messageRouter;