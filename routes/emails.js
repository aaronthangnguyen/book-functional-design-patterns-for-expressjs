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

const updateEmailRoute = async (req, res) => {
  const body = await readBody(req);
  const email = emails.find((email) => email.id === req.params.id);
  Object.assign(email, JSON.parse(body));
  res.status(200).send(email);
};

const deleteEmailRoute = async (req, res) => {
  const index = emails.findIndex((email) => email.id === req.params.id);
  console.log(index);
  emails.splice(index, 1);
  res.status(204).send();
};

const emailsRouter = express.Router();

emailsRouter.get("/", getEmailsRoute);
emailsRouter.get("/:id", getEmailRoute);
emailsRouter.post("/", createEmailRoute);
emailsRouter.patch("/:id", updateEmailRoute);
emailsRouter.delete("/:id", deleteEmailRoute);

module.exports = emailsRouter;
