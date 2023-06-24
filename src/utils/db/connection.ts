import { Sequelize } from 'sequelize';
import { CONSTANT } from '../constant';
import logger from '../logger';

const sequelize = new Sequelize(CONSTANT.CONNECTION_STRING, { dialect: 'postgres', logging: false });
(async () => {
    await sequelize.authenticate();
    logger.info(CONSTANT.LOGGING.DATABASE.SUCCESS);
    // await sequelize.sync({force: true});
    // logger.info(CONSTANT.LOGGING.DATABASE.SYNC);
})()


const db = {
    sequelize: sequelize,
    Sequelize: Sequelize
};


export default db;