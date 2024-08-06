// to check no. of workers
const os = require("os");
console.log(os.cpus().length);

const fs = require("fs");

//blocking request

console.log("1");
console.log(fs.readFileSync("./text.txt", "utf-8"));
console.log("2");

//non - blocking request

console.log("1");
fs.readFile("./text.txt", "utf-8", (err, res) => {
  console.log(res);
});
console.log("2");
