import Router from 'express';
import MessageController from '../controllers/message.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const messageController = new MessageController();

// Create message
router.post('/', authenticate, messageController.createMessage.bind(messageController));

// Update message by ID
router.put('/:id', authenticate, messageController.updateMessage.bind(messageController));

// Get message by ID
router.get('/:id', authenticate, messageController.getMessageById.bind(messageController));

// Get all messages
router.get('/', authenticate, messageController.getAllMessages.bind(messageController));

// Get messages by chat ID
router.get('/chat/:chatId', authenticate, messageController.getMessagesByChatId.bind(messageController));

// Delete message by ID
router.delete('/:id', authenticate, messageController.deleteMessage.bind(messageController));

export default router;