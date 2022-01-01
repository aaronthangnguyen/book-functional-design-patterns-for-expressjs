const express = require("express");

const users = require("./fixtures/users");
const emails = require("./fixtures/emails");

let app = express();
// express() is a factory for building request handlers.

app.use((req, res) => {
  // req: read-only, res: write-only.
  let route = req.method + " " + req.url;

  if (route === "GET /users") {
    console.log(req.accepts());
    res.send(users);
    // res.send() automically converts list of emails to JSON-formatted strings
  } else if (route === "GET /emails") {
    res.send(emails);
  } else {
    res.end("You asked for " + route);
  }
});

app.listen(3000);
