import { Router } from "express";
import messageController from "../../controllers/message.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.get('/:id/messages', auth, messageController.getMessagesByRoomID);
router.get('/create-new-room', messageController.createRoom);


export default router;
