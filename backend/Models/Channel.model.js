const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isPrivate: {
    type: Boolean,
    required: true
  },
  messages: [
    {
      message: { type: String, required: true },
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      }
  ]
}, {
  timestamps: true
});

const Channel = mongoose.models.Channel || mongoose.model("Channel", channelSchema);

module.exports = Channel;
