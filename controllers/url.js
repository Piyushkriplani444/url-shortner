const ShortUniqueId = require("short-unique-id");
const URL = require("../model/url");
// const { nanoid } = require("nanoid");

async function handlegenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const uid = new ShortUniqueId({ length: 8 });
  const shortID = uid.rnd();
  //   const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistry: [],
  });
  return res.json({ id: shortID });
}

module.exports = {
  handlegenerateNewShortURL,
};
