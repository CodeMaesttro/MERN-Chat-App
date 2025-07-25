import express from 'express';
import { sendMessage, getMessages, getConversations, deleteMessage, getMessageInfo } from '../controllers/message.controller.js';
import auth from '../middleware/auth.js';

const messageRouter = express.Router();

messageRouter.get('/chats', auth, getConversations); // Route to get conversations for the current user

messageRouter.get('/getmessages/:userId', auth, getMessages); // Route to get messages between two users

messageRouter.post('/send-message', auth, sendMessage); // Route to send a new message from A to B

messageRouter.get('/messageInfo/:messageId', auth, getMessageInfo); // Route to get all conversations for the current user

messageRouter.delete('/:messageId', auth, deleteMessage); // Route to delete a message


export default messageRouter;