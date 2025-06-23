const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { userId, role, type: "access" },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    { userId, role, type: "refresh" },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    if (decoded.type !== "refresh") {
      throw new Error("Invalid token type");
    }

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      throw new Error("User not found");
    }

    const tokens = generateTokens(user.id, user.role);

    return tokens;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Refresh token expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid refresh token");
    }
    throw new Error("Token refresh failed");
  }
};

const register = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password + process.env.PEPPER, 15);

  const user = await User.create({
    username: username,
    password_hash: hashedPassword,
    role: "user",
  });

  const tokens = generateTokens(user.id, user.role);

  return tokens;
};

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  console.log(user)

  const isValidPassword = await bcrypt.compare(
    password + process.env.PEPPER,
    user.password_hash
  );

  if (!isValidPassword) {
    throw new Error("Invalid username or password");
  }

  const tokens = generateTokens(user.id, user.role);

  return tokens;
};

module.exports = { register, login, refreshToken };
