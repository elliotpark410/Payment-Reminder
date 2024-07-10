import express, { Request } from 'express';
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
const domain2 = getEnvVariable('AWS_AMPLIFY_DOMAIN');
const app = express();

// Set up middleware
// Set security-related HTTP headers
const cspOptions = environment === 'production' ? {} : { directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "'unsafe-inline'"] } };
app.use(helmet({
  contentSecurityPolicy: cspOptions,
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  keyGenerator: (req: Request) => req.socket.remoteAddress || 'unknown',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Configure CORS
const corsOptions = {
  origin: environment === 'production'
    ? [domain, domain2]
    : ['http://localhost:3000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom tokens for date and time period in Pacific Time
morgan.token('date', (req, res, tz) => {
  return moment().tz('America/Los_Angeles').format('MM-DD-YYYY h:mmA');
});

morgan.token('body', (req: express.Request, res: express.Response) => {
  return JSON.stringify(req.body || {});
});

// Custom morgan logging format
const morganFormat = ':date :method :url :status :response-time ms :body';

// Custom morgan skip function to exclude 200 (OK), 201 (created), and 304 (not modified) responses
function responseStatus(req: express.Request, res: express.Response) {
  return res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 304;
};

// Logging middleware
app.use(morgan(morganFormat, { skip: responseStatus }));

// Mount root router
app.use('/', rootRouter);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Express app listening on port ${PORT} in ${environment} mode`);
});

export default app;
