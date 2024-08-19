const express = require("express");
const app = express();
const Url = require("./models/url");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("mongodb Connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(8002, () => console.log("server started"));
