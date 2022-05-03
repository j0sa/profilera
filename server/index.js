require("dotenv").config({
  path: "../.env",
  debug: true, //remove in release
});
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const userModel = require("./models/Users");
const cors = require("cors");
// const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
// const RateLimit = require("express-rate-limit");

const port = process.env.PORT;
const databaseURI = process.env.DATABASE_URI;
const userRouter = require("./routes/users");

// const limiter = new RateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 5,
// });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(limiter);

mongoose.connect(databaseURI);

app.use("/users", userRouter);

app.listen(port || 5000, () => {
  console.log("[Server]::LISTEN:%s", port);
});

app.on("error", (error) => {
  throw new Error(`[Server]::ERROR:${error.message}`);
});
