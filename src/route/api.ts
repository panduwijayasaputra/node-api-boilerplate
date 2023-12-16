import userController from 'controller/user-controller';
import express from 'express';
import { authMiddleware } from 'middleware/auth-middleware';

const router = express.Router();
router.use(authMiddleware);

router.get('/api/users', userController.getAll);
router.get('/api/users/current', userController.get);

export {
    router
}