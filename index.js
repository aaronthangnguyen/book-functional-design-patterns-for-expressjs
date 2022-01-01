const express = require("express");

const users = require("./fixtures/users");
const emails = require("./fixtures/emails");

let app = express();
// express() is a factory for building request handlers.

const getUsersRoute = (req, res) => {
  res.send(users);
  // res.send() automically converts list of emails to JSON-formatted strings
};

const getEmailsRoute = (req, res) => {
  res.send(emails);
};

const noRouteFound = (req, res) => {
  const route = req.method + " " + req.url;
  res.end(`You asked for ${route}`);
};

const routes = {
  "GET /users": getUsersRoute,
  "GET /emails": getEmailsRoute,
};

app.use((req, res) => {
  // req: read-only, res: write-only.
  const route = req.method + " " + req.url;
  const handler = routes[route] || noRouteFound;

  handler(req, res);
});

app.listen(3000);
