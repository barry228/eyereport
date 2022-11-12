const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//passport config
require("./config/passport")(passport);

const users = require("./routes/api/user");
const posts = require("./routes/api/posts");
const admin = require("./routes/api/admin");

//defining express middleware
const app = express();
const port = 1000;

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configuring ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// //configuring logger
app.use(logger("dev"));
app.use(flash());

//SETUP FLASH AND SESSION
app.use(
  session({
    secret:
      "n5t77y9t57ytn7ty5,hj893754yncg3,c.,hc297hc47g.4rg7,ghh.xyh,9btrbr29875t0y5",
    saveUninitialized: false, //If set to true, this session will be
    // saved on the server on each request no matter if
    // something changed or not.
    resave: false,
    cookie: { maxAge: Date.now() + 3600000 }
  })
);

//passport initialization(should always be under the session)
app.use(passport.initialize());
app.use(passport.session());

//GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.success_message = req.flash("success-message");
  res.locals.error_message = req.flash("error-message");
  res.locals.messages = require("express-messages")(req, res);
  res.locals.error = req.flash("error");
  res.locals.isAuthenticated = req.user ? true : false; //tenary operators
  res.locals.user = req.user || null;
  next();
});

//db config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello world"));

//initializing express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//use routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/admin", admin);

app.listen(port, function() {
  console.log(`server started at port ${port}`);
});
