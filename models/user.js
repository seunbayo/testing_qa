var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    fullname : {
        type: String,
        required: true
      },
      email : {
        type : String,
        required : true,
        unique : true
      },
      username : {
        type: String,
        required: true
      },
      password : {
        type : String,
        required : true
      },
      highScore : {
        type: Number,
        default: 0
      }
    });

    UserSchema.pre('save', async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
      });
       
      UserSchema.methods.isValidPassword = async function (password) {
        const user = this;
        const compare = await bcrypt.compare(password, user.password);
        return compare;
      }


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);