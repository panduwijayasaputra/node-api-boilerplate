import { User } from '@prisma/client';
import prisma from '../db'

const getUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
}

const getUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({ where: { email: { equals: email, mode: 'insensitive' } } });
}

const getUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
}

const createUser = async (user: User) => {
    return await prisma.user.create({
        data: user, select: {
            id: true,
            name: true,
            email: true,
        }
    });
}

const editUserById = async (id: string, user: User) => {
    return await prisma.user.update({
        where: { id }, data: user, select: {
            id: true,
            name: true,
            email: true,
        }
    })
}

const deleteUserById = async (id: string) => {
    return await prisma.user.delete({ where: { id } })
}

export default {
    getUserById,
    getUserByEmail,
    getUsers,
    createUser,
    editUserById,
    deleteUserById
}