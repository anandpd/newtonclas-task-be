import 'dotenv/config'
import logger from './utils/logger';
import express, { Application } from 'express';
import cors from 'cors';
import morganBody from 'morgan-body';
import { CONSTANT } from './utils/constant';
import { Ticket } from './models';
const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
morganBody(app);

process.on('unhandledRejection', (e: Error) => {
    logger.error("unhandledRejection", e);
});
process.on('uncaughtException', (e: Error) => {
    logger.error("uncaughtException", e);
});

app.get('/', async (req, res) => {
    const response = await Ticket.findAll();
    return res.json({
        tickets: response
    })
})

app.listen(PORT, () => logger.info(CONSTANT.LOGGING.SERVER.SUCCESS));
