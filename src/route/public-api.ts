import userController from 'controller/user-controller';
import express from 'express';

const publicRouter = express.Router();

publicRouter.post('/api/users/register', userController.register);
publicRouter.post('/api/users/login', userController.login);

export {
    publicRouter
}