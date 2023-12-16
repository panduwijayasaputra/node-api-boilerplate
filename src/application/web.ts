import express from 'express';
import { errorMiddleware } from 'middleware/error-middleware';
import { router } from 'route/api';
import { publicRouter } from 'route/public-api';

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(router);

web.use(errorMiddleware);