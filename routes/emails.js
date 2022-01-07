const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const emails = require("../fixtures/emails");
const generateId = require("../lib/generate-id");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "../uploads") });

const jsonBodyParser = bodyParser.json({ limit: "100kb" });
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
  const attachments = (req.files || []).map(
    (file) => `/uploads/${file.filename}`
  );
  const newEmail = { id: generateId(), ...req.body, attachments };
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
  .post(
    bodyParser.json(),
    upload.array("attachments"),
    createEmailRoute
  );

emailsRouter
  .route("/:id")
  .get(getEmailRoute)
  .patch(jsonBodyParser, updateEmailRoute)
  .delete(deleteEmailRoute);

module.exports = emailsRouter;
