import express from "express";
import rootRouter from "./rootRouter"

// import db from "./config/connection.ts"

const PORT = 3000;
const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount root router
app.use("/", rootRouter);

app.listen(PORT, async () => {
  console.log(`Express app listening on port ${PORT}`);
});

export default app;


