import logger from './logger';
import { Sequelize } from 'sequelize';

async function connectDB(connectionString: string): Promise<any> {
    try {
        let sequelize = new Sequelize(connectionString, {
            dialect: 'postgres'
        });
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log("Sync done!");
        logger.info(`DB connected OK`);
        return sequelize;
    } catch (error) {
        logger.error(`DB not connected, reason = ${JSON.stringify(error)}`);
    }
}

export { connectDB };