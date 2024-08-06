// const http = require("http");
// const fs = require("fs");
// const url = require("url");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("This is home page");
});

app.get("/about", (req, res) => {
  return res.send("This is about page");
});

// const myServer = http.createServer((req, res) => {
//   const log = `${Date.now()} : ${req.url} new request received \n`;
//   const myUrl = url.parse(req.url);
//   console.log(myUrl);
//   fs.appendFile("log.txt", log, (err, data) => {
//     res.end("hello server");
//   });
// });

// const myServer = http.createServer(app);
// myServer.listen(8000, () => console.log("server started"));

app.listen(8000, () => console.log("server started"));
