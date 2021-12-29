import cors from 'cors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { routes } from './routes/index';
import { handleError } from './common/helpers/handleError';
import limiter from './common/filters/rateLimiter';
import docs from './docs/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.use('*', cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);

// swagger config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

// router config
routes.forEach((route) => {
  app[route.method](`/api/v1${route.path}`, ...route.handlers);
});

app.use('/', (req, res, next) => res.json({
    statusCode: 200,
    message: 'server setup successfully',
  }));

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `${req.url} not found`,
  });
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
