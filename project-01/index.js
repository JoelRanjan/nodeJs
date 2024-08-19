const express = require("express");
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
// const userData = JSON.parse(users);
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://127.0.0.1:27017/users-db")
  .then(() => console.log("mongodb Connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//html
app.get("/users/list", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

//restful apis

app.get("/users", (req, res) => {
  res.setHeader("myName", "Joel");
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filterUser = users.filter((user) => user.id === id);
  res.json(filterUser);
});

app.post("/users/user", async (req, res) => {
  const body = req.body;

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
  });
  console.log(result);
  return res.status(201).json({ msg: "success" });

  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.json(data);
  // });
});

app.listen(8001, (err, res) => {
  console.log("server started");
});
