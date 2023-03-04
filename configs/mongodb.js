// MONGO DB Configuration
const mongoose = require("mongoose");

/* For Prod DB Connection */
// const URL_VALUE = process.env.MONGPROD;

/* For Prod DEV DB Connection */
const URL_VALUE = process.env.MONGODEV;

/* For Prod TEST DB Connection */
// const URL_VALUE = process.env.MONGOTEST;

/* For Local DB Connection */
// const URL_VALUE = process.env.MONGOLOCAL;


//Connecting to DB.....
mongoose
  .connect(URL_VALUE.toString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.log(err.message));