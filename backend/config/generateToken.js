const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

module.exports = { generateToken, verifyToken };
