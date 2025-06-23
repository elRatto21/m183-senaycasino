const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  
  const tokens = req.cookies;

  const token = tokens.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
