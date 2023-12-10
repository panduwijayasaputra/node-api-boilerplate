import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../error/response-error';
import { ValidationError } from 'joi'

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            error: err.message
        }).end();
    } else {
        res.status(500);
    }
}

export { errorMiddleware }