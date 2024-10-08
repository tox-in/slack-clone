const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

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
      max: 12,
      min: 10,
    },
    globalUsername: {
        type: String,
        required: [true, "Username is required"],
        match: [/^[a-zA-Z0-9 ]+$/, 'is invalid'],
        index: true,
      },
    globalProfilePicture: { type: String },
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
      }],
      organizations: [{ type: Schema.Types.ObjectId, ref: 'OrganizationMembership' }],
  },
  {
    timestamps: true
  });

userSchema.plugin(uniqueValidator, {message: 'is already taken'});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;