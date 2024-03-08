import { Router } from 'express';
import user from './user.router';
import room from './room.router';
import message from './message.router';

const router: Router = Router();

router.use('/users', user);
router.use('/rooms', room)
router.use('/messages', message)

export default router;