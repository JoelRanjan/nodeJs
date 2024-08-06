const fs = require("fs"); //builtin package

//creating a file

fs.writeFileSync("./text.txt", "hello world"); // to write synchronously
fs.writeFile("./text.txt", "hello world async", (err) => {}); // async

// reading a file
const res = fs.readFileSync("./contact.txt", "utf-8");
console.log(res);

fs.readFile("./contact.txt", "utf-8", (err, res) => {
  console.log(res);
});

// append data in existing file

fs.appendFileSync("./text.txt", "\n heyy ");

// copying a file and creating a new copied file

fs.cpSync("./text.txt", "./copyText.txt");

//deleting a file

fs.unlinkSync("./copyText.txt");

// getting stats of a file

const r = fs.statSync("./text.txt");
console.log(r);

// creating a folder

fs.mkdirSync("myDocs");

fs.mkdirSync("myDocs/a/b", { recursive: true });
