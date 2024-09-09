const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Channel = require("./Channel.model");
const uniqueValidator = require('mongoose-unique-validator');
const { max } = require("rxjs");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      sparse: true
    },
    phone: {
      type: Number,
      unique: true,
      sparse: true,
      length: 10
    },
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      unique: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    channelIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
      }],
    friendIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]
  },
  {
    timestamps: true
  });

userSchema.plugin(uniqueValidator, {message: 'is already taken'});

const User = mongoose.model("User", userSchema);
module.exports = User;