//Importing the required packages
const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid');

//Defining the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//Virtual fields
userSchema
  .virtual("password")
  .set(function (psw) {
    this._password = psw;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(psw);
  })
  .get(function () {
    return this._password;
  });

//Adding methods to user schema
userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) {
      return "";
    } else {
      try {
        return crypto
          .createHmac("sha1", this.salt)
          .update(password)
          .digest("hex");
      } catch (error) {
        return error;
      }
    }
  },
};

//Exporting the model
module.exports = mongoose.model("User", userSchema);
