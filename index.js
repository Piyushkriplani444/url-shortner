const express = require("express");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter.js");
const { connectToMongoDB } = require("./connect");
const path = require("path");
const URL = require("./model/url.js");
const app = express();
const port = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Mongodb connect"))
  .catch(() => console.log("Mongodb error"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistry: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log(`Server started at post  ${port}`));
