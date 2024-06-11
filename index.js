const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const app = express();
const port = 8001;

app.use(express.json());

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Mongodb connect"))
  .catch(() => console.log("Mongodb error"));

app.use("/url", urlRoute);

app.listen(port, () => console.log(`Server started at post  ${port}`));
