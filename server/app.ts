// tslint:disable-next-line
import dotEnv from 'dotenv';

// enable .env
dotEnv.config();

//Custom response
import './src/utils/misc/res-ext'
import express, { Response, Request, NextFunction } from "express";
import apiRouter from "./src/routes/index.router";
import http from "http";
import { ApiError } from './src/utils/misc/misc.helper';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import cors from 'cors';
import bodyParser from 'body-parser';
import { logData, viewLogs } from './src/utils/logs/error.logs';
const app = express();

// Restrict/ allow origins, methods and headers
app.use(cors({ origin: "*" }));

// Body parser to allow json and other post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API
app.use("/api", apiRouter);


// Handle un handled exceptions
/* istanbul ignore next */
process.on('unhandledRejection', (reason: Error | any) => {
    throw new Error(reason.message || reason);
});

/* istanbul ignore next */
process.on('uncaughtException', (error: Error) => {
    throw error;
});
/* istanbul ignore next */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.SendResponse(err.status, {}, err.message);
    }
    logData(err);
    res.InternalServerError(err);
});

// custom error logs view
app.get('/logs', (req, res, next) => {
    res.Ok(viewLogs());
})

// Route not found fallback
/* istanbul ignore next */
app.use(function (req, res, next) {

    res.NotFound("");
});
const server = http.createServer(app);
export default server;