import { User } from '@prisma/client'
import userService from './services';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken'
import { Request, Response } from 'express'

const createUser = async (req: Request, res: Response) => {
    try {
        const data: User = req.body;
        if (!data.email) {
            return res.status(400).json({ error: 'Email is required' })
        }

        if (!data.password) {
            return res.status(400).json({ error: 'Password is required' })
        }

        const user = await userService.getUserByEmail(data.email);
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        } else {
            const hashPassword = bcrypt.hashSync(data.password, 10);
            const result = await userService.createUser({ ...data, password: hashPassword });
            res.status(201).json({ data: result })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUsers();
        res.status(200).json({ data: result })
    } catch (err) {
        res.status(500).send(err)
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json({ data: user })

    } catch (err) {
        res.status(500).send(err)
    }



}

const authenticate = async (req: Request, res: Response) => {
    try {
        const data: User = req.body;

        if (!data.email) {
            return res.status(400).json({ error: 'Email is required' })
        }

        if (!data.password) {
            return res.status(400).json({ error: 'Password is required' })
        }

        const user = await userService.getUserByEmail(data.email);

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const validPassword = bcrypt.compareSync(data.password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Wrong password' })
        }

        const { password, ...result } = user;
        const secretKey = process.env.JWT_SECRET!;
        const expiresIn = 60 * 60 * 1;
        const token = jsonwebtoken.sign(result, secretKey, { expiresIn });

        res.status(200).json({ token });

    } catch (err) {

    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await userService.deleteUserById(id);

        res.status(200).json({ data: 'User was deleted' });

    } catch (err) {
        res.status(500).send(err);
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {password, ...data} = req.body;

        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const result = await userService.editUserById(id, data);

        return res.status(200).json({ data: result });

    } catch (err) {
        res.status(500).send(err);
    }
}

export default {
    authenticate,
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser
}