import { Request, Response, NextFunction } from 'express';
import userService from 'service/user-service';


const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.register(req);
        res.status(200).json({ data: result })
    } catch (e) {
        next(e)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.login(req);
        res.status(200).json({ data: result })
    } catch (e) {
        next(e)
    }
}

const getCurrent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.context.tokenData.id;
        const result = await userService.get(id);
        res.status(200).json({ data: result })
    } catch (e) {
        next(e)
    }
}

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.getList();
        res.status(200).json({ data: result })
    } catch (e) {
        next(e)
    }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const result = await userService.get(userId);
        res.status(200).json({ data: result })
    } catch (e) {
        next(e);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const result = await userService.update(userId, req);
        res.status(200).json({ data: result })
    } catch (e) {
        next(e);
    }
}

export default { register, login, getCurrent, getAll, getById, update }