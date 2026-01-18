const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-vercel-app.vercel.app"
  ]
}));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;