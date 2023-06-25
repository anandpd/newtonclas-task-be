import 'dotenv/config'
import logger from './utils/logger';
import express, { Application } from 'express';
import cors from 'cors';
import morganBody from 'morgan-body';
import { CONSTANT } from './utils/constant';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/http-handlers';
const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
morganBody(app);

app.get('/', async (req, res) => res.send("<p>Newoton BE</p>"))
app.use("/v1", routes);
process.on('unhandledRejection', (e: Error) => {
    logger.error("unhandledRejection", e);
});
process.on('uncaughtException', (e: Error) => {
    logger.error("uncaughtException", e);
});


app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => logger.info(CONSTANT.LOGGING.SERVER.SUCCESS(+PORT) ));
