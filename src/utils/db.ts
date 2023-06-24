import * as pg from 'pg';
import logger from './logger';

let pool = null;
let client = null;
(async () => {
    pool = new pg.Pool({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT)
    });
    client = await pool.connect();
    client ? logger.info(`Client connected OK`) : logger.error("Client not connected !");

})()

pool ? logger.info(`Pool established OK`) : logger.error("Pool connection failed !");

export { pool, client };