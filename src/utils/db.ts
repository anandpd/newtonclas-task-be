import {Pool, ClientBase, PoolClient} from 'pg';
import logger from './logger';

let pool:Pool;
let client:PoolClient;

async function connectDB(){
    pool = new Pool({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT)
    });
    client = await pool.connect();
    pool ? logger.info(`Pool established OK`) : logger.error("Pool connection failed !");
    client ? logger.info(`Client connected OK`) : logger.error("Client not connected !");
    return {client, pool};
}

export default connectDB;