var express = require("express");
var router = express.Router()
var User = require("../models/user");
var middleware = require("../middleware/index");



//HOMEPAGE ROUTE
router.get("/", function (req, res) {
    res.render("home");
  });
  
  //LEVEL ROUTE
router.get("/level",  function (req, res) {
    res.render("level");
  });
  
  //COURSE ROUTE
router.get("/course", middleware.isLoggedIn, function (req, res) {
    res.render("course");
  });
  
  //Difficulty Route
router.get("/diff", middleware.isLoggedIn, function (req, res) {
    res.render("diff");
  });
  
  //GAME ROUTE
router.get("/game", middleware.isLoggedIn, function (req, res) {
    res.render("game");
  });
  
   
  module.exports = router;