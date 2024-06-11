const express = require("express");
const {
  handlegenerateNewShortURL,
  handleGetAnalysis,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handlegenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalysis);

module.exports = router;
