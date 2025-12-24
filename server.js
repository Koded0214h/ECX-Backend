// Import dotenv module
require("dotenv").config();

// Import http
const http = require("http");  // import HTTP module

const fs = require("fs");  // import file system module

const path = require("path"); // import path module

// .createServer() ===========  (request, response) => {}

// res.end("")

const server = http.createServer((req, res) => {

    // req.url == "/one/bit"

    // req.url == "youtube.com/index.md"

    let filePath = (req.url === "/")

    // ternary operator

    ? path.join(__dirname, "public", "index.html")
    : path.join(__dirname, "public", req.url);

    // nodejs/public/one/bit.html

    

    // req.url === "/subscribers"

    // creating the extension name

    const extname = path.extname(filePath);

    let contentType = 'text/html';

    switch(extname) {
        case ".css" : contentType = "text/css";
        case ".js" : contentType = "text/js";
        case ".json" : contentType = "application/json";
        case ".png" : contentType = "image/png";
        case ".jpg" : contentType = "image/jpg";
    }

    fs.readFile(filePath, (err, content) => {
        if(err) {
            if (err === "ENOENT") {
                fs.readFile(
                    path.join(__dirname, "public", "404.html"),
                    (err, notFoundContent) => {
                        res.writeHead(404, {"content-type": 'text/html'});
                        res.end(notFoundContent || '<h1> 404 -- Page NOT FOUND </h1>');
                    }
                )
            }
        } else {
            res.writeHead(200, {"content-type": contentType});
            res.end(content)
        }
    }) 

})

// nodejs/public/index.html


const PORT = 7000;

let password = process.env.PASSWORD || "passkey";

// Developer environment:
// 1. Development
// 2. Production

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})