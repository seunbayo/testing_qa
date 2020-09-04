

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
var middleware = require("./middleware/index");

const routes = require('./routes/main');
const gameRoutes = require("./routes/game")
const secureRoutes = require('./routes/secure');
const passwordRoutes = require('./routes/password');

// setup mongo connection
mongoose.connect("mongodb://localhost/quiz_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});
mongoose.set('useFindAndModify', false);

// create an instance of an express app
const app = express();


// update express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());

// require passport auth
require('./auth/auth');

app.get('/game', passport.authenticate('jwt', { session : false }), function (req, res) {
  res.render("game.ejs")
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render("home.ejs")
});

// =================
//HOMEPAGE ROUTE
app.get("/", function (req, res) {
  res.render("home");
});

//LEVEL ROUTE
app.get("/level",  function (req, res) {
  res.render("level");
});

//COURSE ROUTE
app.get("/course",  function (req, res) {
  res.render("course");
});

//Difficulty Route
app.get("/diff",  function (req, res) {
  res.render("diff");
});

//GAME ROUTE
app.get("/game",  function (req, res) {
  res.render("game");
});






//SHow the register form
app.get("/register", function (req, res) {
  res.render("register");
});

//Handle SignUp logic











function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}








// ============================














// main routes
app.use('/', routes);
app.use('/', passwordRoutes);
app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);

// catch all other routes
app.use((req, res, next) => {
  res.status(404).json({ message: '404 - Not Found' });
});

// handle errors
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
