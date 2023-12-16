import userController from 'controller/user-controller';
import express from 'express';
import { authMiddleware } from 'middleware/auth-middleware';

const router = express.Router();
router.use(authMiddleware);

// User Routes
router.get('/api/users', userController.getAll);
router.get('/api/users/current', userController.getCurrent);
router.get('/api/users/:id', userController.getById);
router.patch('/api/users/:id', userController.update);

export {
    router
}