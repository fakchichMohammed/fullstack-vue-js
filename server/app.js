const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/user");
const app = express();

// configure mongoose and database
mongoose
  .connect(
    "mongodb+srv://mohammed:lUdlndW0c2udRKtB@cluster0.rlck1.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((err) => {
    console.log({
      log: "Connection failed!",
      database_error: err
    });
  });
// database configuration ends here

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// configure body-parser ends here

// configure morgan
app.use(morgan("dev"));
// configure morgan ends here

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);

module.exports = app;
