const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/api/items.js");

const app = express();

app.use(bodyParser.json());

const db = require("./config/config").databaseURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo Database");
  })
  .catch(err => console.log(err));

const PORT = 5000 || process.env.PORT;

app.use("/data/items", router);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
