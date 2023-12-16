
import { TokenData } from './../../@types/express';
import { prismaClient } from 'application/database';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(401).json({
            error: 'Unauthorized'
        }).end();
    } else {
        const secretKey = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secretKey) as TokenData;
        const userCount = await prismaClient.user.count({ where: { id: decoded.id } });

        if (userCount !== 1) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else {
            req.context = { ...req.context, tokenData: decoded };
            next();
        }
    }
}