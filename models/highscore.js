var  mongoose = require("mongoose");


var highscoreSchema = mongoose.Schema({
    finalScore: String,
    user: String
});



module.exports = mongoose.model("Highscore", highscoreSchema);