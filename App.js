const express = require("express");
const { connectWithDB } = require("./dbConnection.js");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUploader = require("express-fileupload");
const userRouter = require("./Routes/userRoutes.js");
const jobRouter = require("./Routes/jobRouter.js");
const applicationRouter = require("./Routes/applicationRouter.js");
const { errorHandler } = require("./Middlewares/errorHandler.js");

const App = express();
// ! DOTENV CONFIG
dotenv.config({
  path: "./Config/config.env",
});

//! FRONTEND BACKEND CONNECTION SETUP
App.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectWithDB(process.env.DATABASE_URL);

//! Middlewares
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(
  fileUploader({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
App.use(cookieParser());

// ! ROUTES
App.use("/api/userRoutes", userRouter);
App.use("/api/jobRoutes", jobRouter);
App.use("/api/applicationRoutes", applicationRouter);

App.get("/", (req, res) => {
  return res.send("Hello World!");
});

// ! ERROR MIDDLEWARE
App.use(errorHandler);

module.exports = { App };
