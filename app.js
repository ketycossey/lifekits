const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();
const mustacheExpress = require("mustache-express");
const path = require("path");
const models = require("./models");
const session = require("express-session");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");

const SALT_ROUNDS = 10;
const PORT = 3000;
const VIEW_PATH = path.join(__dirname, "./views");
global.__basedir = __dirname;

app.use(
  session({
    secret: "somesecret",
    resave: true,
    saveUninitialized: false,
  })
);

app.use("/uploads", express.static("uploads"));
app.use("/css", express.static("css"));

app.use(bodyParser.urlencoded({ entended: false }));
//app.use(bodyParser.json());

app.engine("mustache", mustacheExpress(VIEW_PATH + "/partials", ".mustache"));
app.set("views", VIEW_PATH);
app.set("view engine", "mustache");

app.use("/", indexRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => console.log("Server is running..."));
