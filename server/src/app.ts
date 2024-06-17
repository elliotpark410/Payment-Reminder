import express from "express";
import rootRouter from "./rootRouter"
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

// Set up middleware
// Set security-related HTTP headers
app.use(helmet());

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});
app.use(limiter);

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:3000'], // allow requests from these origins
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount root router
app.use("/", rootRouter);

app.listen(PORT, async () => {
  console.log(`Express app listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

export default app;


