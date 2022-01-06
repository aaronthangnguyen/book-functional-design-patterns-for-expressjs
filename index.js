const express = require("express");

// Routers
const usersRouter = require("./routes/users");
const emailsRouter = require("./routes/emails");

// express() is a factory for building request handlers.
const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);
app.use("/users", usersRouter);
app.use("/emails", emailsRouter);

app.listen(3000, () => {
  console.log("Server is running at Port 3000.");
});
