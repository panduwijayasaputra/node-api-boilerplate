import { User } from '@prisma/client';
import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from '../validation/user-validation';
import { validateRequest, validateString } from '../validation/validation';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken'

const register = async (request: Request) => {
    const user = validateRequest(registerUserValidation, request);

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
    const loginRequest = validateRequest(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            id: true,
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

const get = async (id: string) => {
    const requestId = validateString(getUserValidation, id);

    const user = await prismaClient.user.findUnique({
        where: { id: requestId }, select: {
            id: true,
            email: true,
            name: true
        }
    });

    if (!user) {
        throw new ResponseError(401, 'User not found');
    }

    return user;
}

const getList = async () => {
    return await prismaClient.user.findMany({ select: { id: true, email: true, name: true } });
}

const update = async (id: string, request: Request) => {

    const user = validateRequest(updateUserValidation, request);

    const userCount = await prismaClient.user.count({
        where: {
            id
        }
    });

    if (!!userCount) {
        throw new ResponseError(401, 'User not found');
    }

    return await prismaClient.user.update({
        where: {id},
        data: user
    })
}


export default { register, login, get, getList, update }