import { Router } from "express";
import ChatController from "../controllers/chat.controller";
import { authenticate } from "../middleware/auth.middleware";
import { chatService } from "@/app";


const router = Router();
const chatController = new ChatController(chatService);

//Create chat

router.post("/", authenticate, chatController.createChat.bind(chatController));
//Get chat by ID
router.get("/:id", authenticate, chatController.getChatById.bind(chatController));

//Get all chats
router.get("/", authenticate, chatController.getAllChats.bind(chatController));

//Get chats by user ID
router.get("/user/:userId", authenticate, chatController.getChatsByUserId.bind(chatController));

//Get chats by subject ID
router.get("/subject/:subjectId", authenticate, chatController.getChatsBySubjectId.bind(chatController));

//Update chat by ID
// router.put("/:id", authenticate, chatController.updateChat.bind(chatController));

//Delete chat by ID
router.delete("/:id", authenticate, chatController.deleteChat.bind(chatController));

export default router;

