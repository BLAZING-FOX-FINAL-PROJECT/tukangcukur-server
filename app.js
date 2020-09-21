if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const index = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", index);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  const port = process.env.PORT
  app.listen(port, ()=>{console.log(port)})
}


module.exports = app;
