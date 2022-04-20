require("dotenv").config({
  path: "../.env",
  debug: true,
});
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const userModel = require("./models/Users");
const cors = require("cors");
//const bcrypt = require("bcrypt");

const port = process.env.PORT;
const databaseURI = process.env.DATABASE_URI;
const userRouter = require("./routes/users");

app.use(express.json());
app.use(cors());

mongoose.connect(databaseURI);

app.use("/users", userRouter);

app.listen(port, () => {
  console.log("[Server]::LISTEN:%s", port);
});

app.on("error", (error) => {
  throw new Error(`[Server]::ERROR:${error.message}`);
});
