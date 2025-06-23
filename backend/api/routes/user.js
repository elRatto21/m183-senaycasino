const express = require("express");
const {
  getUserBalance,
  updateUserBalance,
  getUser,
} = require("../controllers/userController");
const router = express.Router();
const { authorizeRole, authenticateToken } = require("../middleware/auth");

router.get("/balance", authenticateToken, getUserBalance);
router.put(
  "/balance",
  authenticateToken,
  authorizeRole("admin"),
  updateUserBalance
);

router.get("", authenticateToken, getUser);

module.exports = router;
