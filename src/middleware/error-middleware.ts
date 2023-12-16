import { ResponseError } from 'error/response-error';
import { Request, Response, NextFunction } from 'express';

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
        res.status(500).end();
    }
}

export { errorMiddleware }