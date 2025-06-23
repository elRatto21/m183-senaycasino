const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { getBalance, updateBalance } = require("../services/userService");

const getUserBalance = async (req, res) => {
  try {
    const balance = await getBalance(req.query.username);
    res.json({ balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUserBalance = async (req, res) => {
  try {
    const { amount } = req.body;
    const balance = await updateBalance(req.query.username, amount);
    res.json({ balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    const username = user.dataValues.username.toString();
    const role = user.dataValues.role.toString();

    console.log("usernamerole", username, role)

    res.setHeader('Content-Type', 'application/json');

    res.status(200).json({ username, role });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getUserBalance, updateUserBalance, getUser };
