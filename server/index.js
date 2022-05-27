const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();

// configure mongoose and database
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database)
  .then(() => {
    console.log("Database is connected");
  })
  .catch( err => {
    console.log({ database_error: err });
  });
// db configuration ends here

// registering cors
app.use(cors());

// configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// configure body-parser ends here

// configure morgan
app.use(morgan("dev"));
// configure morgan ends here

// define first route
app.get("/", (req, res) => {
  console.log("Hello mevn developer");
});
// bring in our user routes
const useRoutes = require("./api/user/route/user");
app.use("/user", useRoutes);
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
