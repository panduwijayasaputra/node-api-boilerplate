import express from 'express';
import userController from './controllers';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);
router.post('/register', userController.createUser);
router.post('/authenticate', userController.authenticate);

export default router;
