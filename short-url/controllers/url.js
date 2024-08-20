const shortid = require("shortid");

const Url = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "enter url" });
  const shortID = shortid(8);
  await Url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortID });
  //return res.json({ id: shortID });
}

module.exports = { handleGenerateNewShortUrl };
