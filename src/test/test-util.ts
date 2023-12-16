import { prismaClient } from '../application/database';
import bcrypt from 'bcrypt';

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            email: 'tester@gmail.com'
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            email: 'tester@gmail.com',
            password: await bcrypt.hash('password123;', 10),
            name: 'User Test'
        }
    });
}