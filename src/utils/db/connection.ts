import { Sequelize } from 'sequelize';
import { CONSTANT } from '../constant';
import logger from '../logger';

const sequelize = new Sequelize(CONSTANT.CONNECTION_STRING, { dialect: 'postgres', logging: false });
(async () => {
    try {
        await sequelize.authenticate();
        logger.info(CONSTANT.LOGGING.DATABASE.SUCCESS);
        await sequelize.sync({});
        logger.info(CONSTANT.LOGGING.DATABASE.SYNC);
    } catch (error) {
        logger.error(`Error in connecting DB ${error}`);
        throw error;
    }
})()


const db = {
    sequelize: sequelize,
    Sequelize: Sequelize
};


export default db;