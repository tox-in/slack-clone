import TokenBlacklist from '../models/TokenBlacklist.js';

const checkTokenBlacklist = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    res.status(401);
    throw new Error('No token provided');
  }

  const blacklisted = await TokenBlacklist.findOne({ token });

  if (blacklisted) {
    res.status(401);
    throw new Error('Token is blacklisted');
  }

  next();
};

export default checkTokenBlacklist;
