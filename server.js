const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/api/items.js");
require("dotenv").config();
const app = express();

app.use(express.json()); // express body parsing middleware that allows access to the body of incoming requests

// MongoDB from the URI
const db = process.env.mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo Database");
  })
  .catch(err => console.log(err));

const PORT = 5000 || process.env.PORT;

app.use("/items", router);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
