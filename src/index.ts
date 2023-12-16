import { logger } from 'application/logger';
import { web } from 'application/web';
import dotenv from 'dotenv';

dotenv.config();
const PORT: number = parseInt(process.env.PORT! || '3000');

web.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});