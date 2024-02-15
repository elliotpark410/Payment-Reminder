import express from "express";
import userRouter from "./api/user"
import lessonRouter from "./api/lesson"
import textRouter from "./api/text"

// import db from "./config/connection.ts"

const PORT = 3000;
const app = express();

// Set up routers
app.use("/user", userRouter);
app.use("/lesson", lessonRouter);
app.use("/text", textRouter);


app.listen(PORT, async () => {
  console.log(`Express app listening on port ${PORT}`);
});


