import cors from 'cors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';

import { routes } from './routes/index';
import { handleError } from './common/helpers/handleError';
import limiter from './common/filters/rateLimiter';
import docs from './docs/index';

const app = express();

app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', ' PUT', 'DELETE', 'PATCH'],
  credentials: true, // enable set cookie
}));
app.use('*', cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', ' PUT', 'DELETE', 'PATCH'],
  credentials: true, // enable set cookie
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_SESSION));
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);
app.use(session({
  secret: process.env.SECRET_SESSION,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
    sameSite: 'Lax',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
  },
  saveUninitialized: true,
  resave: false,
}));
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
