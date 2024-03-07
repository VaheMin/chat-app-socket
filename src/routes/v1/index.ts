import { Router } from 'express';
import user from './user.router';
import room from './room.router';

const router: Router = Router();

router.use('/users', user);
router.use('/rooms', room)

export default router;