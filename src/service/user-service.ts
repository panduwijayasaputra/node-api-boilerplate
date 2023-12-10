import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { registerUserValidation } from '../validation/user-validation'
import { validate } from '../validation/validation'
import bcrypt from 'bcrypt'

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

export default { register }