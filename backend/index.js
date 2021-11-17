const express = require("express");
var cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// statics
app.use(express.static("static"));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// routers
const userRouter = require("./routes/user");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const graceRouter = require("./routes/grace");
const aidRouter = require("./routes/aid");

// use routers
app.use(userRouter.router);
app.use(registerRouter.router);
app.use(loginRouter.router);
app.use(graceRouter.router);
app.use(aidRouter.router);

app.listen(5001, () => {
  console.log(`database running at http://localhost:5001`);
});
