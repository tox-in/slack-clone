import mongoose from 'mongoose';

const TokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }
});

const TokenBlacklist = mongoose.model('TokenBlacklist', TokenBlacklistSchema);

export default TokenBlacklist;