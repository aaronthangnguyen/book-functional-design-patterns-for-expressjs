const express = require("express");
const logger = require("./lib/logger");
const compress = require("compression");
const serveStatic = require("serve-static");
const path = require("path");

// Routers
const usersRouter = require("./routes/users");
const emailsRouter = require("./routes/emails");

// express() is a factory for building request handlers.
const app = express();

// Middlewares
app.use(logger);
app.use(compress(/* { threshold: 0  }*/));
app.use(serveStatic(path.join(__dirname, "public")));
app.use("/uploads", serveStatic(path.join(__dirname, "uploads")));
app.use("/users", usersRouter);
app.use("/emails", emailsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running at Port 3000.");
});
