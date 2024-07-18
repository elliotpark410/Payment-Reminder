import express, { Request, Response, NextFunction } from 'express';
import rootRouter from './rootRouter';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { getEnvVariable } from './util/index';
import morgan from 'morgan';
import moment from 'moment-timezone';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const PORT = getEnvVariable('PORT');
const environment = getEnvVariable('NODE_ENV');
const domain = getEnvVariable('DOMAIN');
const domain_www = getEnvVariable('DOMAIN_WWW');
const domain_api = getEnvVariable('DOMAIN_API');
const domain_aws = getEnvVariable('AWS_AMPLIFY_DOMAIN');

const app = express();

// Set up middleware
// Set security-related HTTP headers
const cspOptions =
  environment === 'production'
    ? {}
    : { directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "'unsafe-inline'"] } };
app.use(
  helmet({
    contentSecurityPolicy: cspOptions,
    crossOriginEmbedderPolicy: false,
  }),
);

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 400, // limit each IP to 400 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  keyGenerator: (req: Request) => req.socket.remoteAddress || 'unknown',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Configure CORS
const corsOptions = {
  origin:
    environment === 'production'
      ? [domain, domain_www, domain_aws, domain_api]
      : ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom tokens for date and time period in Pacific Time
morgan.token('date', () => {
  return moment().tz('America/Los_Angeles').format('MM-DD-YYYY h:mmA');
});

morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body || {});
});

// Custom morgan logging format
const morganFormat = ':date :method :url :status :response-time ms :body';

// Custom morgan skip function to exclude 200 (OK), 201 (created), and 304 (not modified) responses
function responseStatus(req: express.Request, res: express.Response) {
  return res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 304;
}

// Logging middleware
app.use(morgan(morganFormat, { skip: responseStatus }));

// Middleware to log request and response
// app.use((req: Request, res: Response, next: NextFunction) => {
// console.log(`Request received: ${req.method} ${req.url}`);
// console.log(`Params: ${JSON.stringify(req.params)}`);
// console.log(`Query: ${JSON.stringify(req.query)}`);

// const originalSend = res.send.bind(res);
// res.send = (body) => {
//   console.log(`Response: ${res.statusCode} ${body}`);
//   return originalSend(body);
// };

//   next();
// });

// Error handling middleware to log errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error occurred: ${err.message}`);
  console.error(`Stack trace: ${err.stack}`);
  next(err);
});

// Mount root router
app.use('/', rootRouter);

// Serve favicon.ico (respond with a 204 No Content status)
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Express app listening on port ${PORT} in ${environment} mode`);
});

export default app;
