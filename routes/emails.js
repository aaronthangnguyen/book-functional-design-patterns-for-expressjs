const express = require("express");
const readBody = require("../lib/read-body");
const emails = require("../fixtures/emails");
const generateId = require("../lib/generate-id");

const getEmailsRoute = (req, res) => {
  res.send(emails);
};

const getEmailRoute = (req, res) => {
  const email = emails.find((email) => email.id === req.params.id);
  res.send(email);
};

const createEmailRoute = async (req, res) => {
  body = await readBody(req);
  const newEmail = { id: generateId(), ...JSON.parse(body) };
  emails.push(newEmail);
  res.status(201).send();
};

const emailsRouter = express.Router();

emailsRouter.get("/", getEmailsRoute);
emailsRouter.get("/:id", getEmailRoute);
emailsRouter.post("/", createEmailRoute);

module.exports = emailsRouter;
