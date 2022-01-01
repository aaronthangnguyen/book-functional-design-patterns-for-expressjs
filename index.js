const http = require("http");
const express = require("express");

const users = require("./fixtures/users");
const emails = require("./fixtures/emails");

let app = express();

app.use((req, res) => {
  // req: read-only, res: write-only
  let route = req.method + " " + req.url;

  if (route === "GET /users") {
    res.end(JSON.stringify(users));
  } else if (route === "GET /emails") {
    res.end(JSON.stringify(emails));
  } else {
    res.end("You asked for " + route);
  }
});

let server = http.createServer(app);

server.listen(3000);
