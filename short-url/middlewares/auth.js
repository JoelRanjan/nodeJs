const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userId = req.cookies?.uid;

  if (!userId) return res.redirect("login");
  const user = getUser();
  if (!user) return res.redirect("login");
  req.user = user;
  next();
}

module.exports = { restrictToLoggedinUserOnly };
