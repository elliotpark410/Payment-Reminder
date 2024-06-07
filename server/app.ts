import express from "express";
import rootRouter from "./rootRouter"
import helmet from "helmet";
import cors from "cors";

// import db from "./config/connection.ts"

const PORT = 3000;
const app = express();

// Set up middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount root router
app.use("/", rootRouter);

app.listen(PORT, async () => {
  console.log(`Express app listening on port ${PORT}`);
});

export default app;


