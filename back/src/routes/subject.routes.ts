import Router from "express";
import SubjectController from "../controllers/subject.controller";
import { authenticate } from "../middleware/auth.middleware";
// import { authorize } from "../middleware/authorization.middleware";

const router = Router();
const subjectController = new SubjectController();

// Create subject
router.post("/", authenticate, subjectController.createSubject.bind(subjectController));

// Get subject by ID
router.get("/:id", authenticate, subjectController.getSubjectById.bind(subjectController));

// Get all subjects
router.get("/", authenticate, subjectController.getAllSubjects.bind(subjectController));

// Get subjects by user ID
router.get("/user/:userId", authenticate, subjectController.getSubjectsByUserId.bind(subjectController));

// Get subjects by chat ID
router.get("/chat/:chatId", authenticate, subjectController.getSubjectsByChatId.bind(subjectController));

// Update subject by ID
// router.put("/:id", authenticate, subjectController.updateSubject.bind(subjectController));

// Delete subject by ID
router.delete("/:id", authenticate, subjectController.deleteSubject.bind(subjectController));

export default router;