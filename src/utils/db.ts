import logger from './logger';
import { Sequelize } from 'sequelize';


async function connectDB(connectionString: string): Promise<void> {
    try {
        const sequelize = new Sequelize(connectionString);
        await sequelize.authenticate();
        logger.info(`DB connected OK`)
    } catch (error) {
        logger.error("DB not connected !");
    }
}

export default connectDB;