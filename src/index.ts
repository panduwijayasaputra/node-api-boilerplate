import dotenv from 'dotenv';
import { web } from './application/web';
import { logger } from './application/logging';

dotenv.config();
const PORT: number = parseInt(process.env.PORT! || '3000');

web.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});