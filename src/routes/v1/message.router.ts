import { Router } from "express";
import messageController from "../../controllers/message.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.delete("/:id", auth, messageController.deleteMessage);

export default router;
