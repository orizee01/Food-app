import "dotenv/config";
import config from "./src/config/index.js";
// import config from '../src/config/index'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './src/logger/index.js';


const app = express();
const port = config.PORT || 5000
global.logger = logger;

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(morgan('conbined'))
  

app.listen(port, () => {
    logger.info(`Application running on port ${port}`)
} )


export default app;