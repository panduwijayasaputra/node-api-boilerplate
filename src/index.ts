import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import users from './users';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT! || '3000');

app.use(express.json());


app.use('/api/users', users);
// app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});