const express = require("express");
const jsonBodyParser = require("../lib/json-body-parser");
const emails = require("../fixtures/emails");
const generateId = require("../lib/generate-id");

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
  }
}

const getEmailsRoute = (req, res) => {
  res.send(emails);
};

const getEmailRoute = (req, res) => {
  const email = emails.find((email) => email.id === req.params.id);
  if (!email) {
    throw new Error();
  }
  res.send(email);
};

const createEmailRoute = async (req, res) => {
  const newEmail = { id: generateId(), ...req.body };
  emails.push(newEmail);
  res.status(201).send();
};

const updateEmailRoute = async (req, res) => {
  const email = emails.find((email) => email.id === req.params.id);
  Object.assign(email, req.body);
  res.status(200).send(email);
};

const deleteEmailRoute = async (req, res) => {
  const index = emails.findIndex((email) => email.id === req.params.id);
  console.log(index);
  emails.splice(index, 1);
  res.status(204).send();
};

const emailsRouter = express.Router();

// prettier-ignore
emailsRouter.route("/")
  .get(getEmailsRoute)
  .post(jsonBodyParser, createEmailRoute);

emailsRouter
  .route("/:id")
  .get(getEmailRoute)
  .patch(jsonBodyParser, updateEmailRoute)
  .delete(deleteEmailRoute);

module.exports = emailsRouter;
