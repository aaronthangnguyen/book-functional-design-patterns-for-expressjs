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

const router = express.Router();
router.get("/users", getUsersRoute);
router.get("/emails", getEmailsRoute);

app.use(router);
app.listen(3000);
