const express = require("express");
const app = express();
const path = require("path");
const Url = require("./models/url");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { connectToMongoDB } = require("./connect");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("mongodb Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.get("/test", async (req, res) => {
//   const allUrls = await Url.find({});
//   res.render("home", {
//     urls: allUrls,
//   });
// });

app.get("/url/:shortId", async (req, res) => {
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
