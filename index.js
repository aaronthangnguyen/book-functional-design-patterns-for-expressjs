const express = require("express");

// Routers
const usersRouter = require("./routes/users");
const emailsRouter = require("./routes/emails");

// express() is a factory for building request handlers.
const app = express();

const logger = require("./lib/logger");

// Middlewares
app.use(logger);
app.use("/users", usersRouter);
app.use("/emails", emailsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running at Port 3000.");
});
