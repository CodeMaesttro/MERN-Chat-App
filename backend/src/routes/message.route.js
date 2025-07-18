import express from "express";
import { deleteMessage, getConversations, getMessage, getMessages, sendMessage } from "../controllers/message.controllers.js";
import auth from "../middlewares/auth.middleware.js";

const messageRouter = express.Router();
messageRouter.get("/", auth, getConversations);

messageRouter.post("/send", auth, sendMessage);

messageRouter.get("/:userId", auth, getMessages);

messageRouter.delete("/:messageId", auth, deleteMessage);

messageRouter.get("/:messageId", auth, getMessage);

export default messageRouter;