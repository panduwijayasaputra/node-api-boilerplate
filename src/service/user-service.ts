import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { loginUserValidation, registerUserValidation } from '../validation/user-validation';
import { validate } from '../validation/validation';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken'

const register = async (request: Request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (countUser >= 1) {
        throw new ResponseError(400, 'Email already exist');
    }

    user.password = await bcrypt.hash(user.password, 10);

    return await prismaClient.user.create({
        data: user, select: {
            email: true, name: true
        }
    });
}

const login = async (request: Request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            email: true,
            name: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, 'Wrong username or password');
    }

    const { password, ...userData } = user;
    const isPasswordValid = await bcrypt.compare(loginRequest.password, password);

    if (!isPasswordValid) {
        throw new ResponseError(401, 'Wrong username or password');
    }

    const secretKey = process.env.JWT_SECRET!;
    const expiresIn = 60 * 60 * 1;
    const token = jwt.sign(userData, secretKey, { expiresIn });

    return { token }
}



export default { register, login }