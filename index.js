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

const usersRouter = express.Router();
usersRouter.get("/", getUsersRoute);
usersRouter.get("/:id", getUserRoute);

const emailsRouter = express.Router();
emailsRouter.get("/", getEmailsRoute);
emailsRouter.get("/:id", getEmailRoute);

app.use("/users", usersRouter);
app.use("/emails", emailsRouter);

app.listen(3000);
