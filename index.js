const express = require("express");

const users = require("./fixtures/users");
const emails = require("./fixtures/emails");

let app = express();
// express() is a factory for building request handlers.

const getUsersRoute = (req, res) => {
  res.send(users);
  // res.send() automically converts list of emails to JSON-formatted strings
};

const getUserRoute = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);

  res.send(user);
};

const getEmailsRoute = (req, res) => {
  res.send(emails);
};

const getEmailRoute = (req, res) => {
  const email = emails.find((email) => email.id === req.params.id);

  res.send(email);
};

const router = express.Router();
router.get("/users", getUsersRoute);
router.get("/users/:id", getUserRoute);
router.get("/emails", getEmailsRoute);
router.get("/emails/:id", getEmailRoute);

app.use(router);
app.listen(3000);
