const express = require("express");
const { getAllGames, createGame } = require("../controllers/gameController");
const { authenticateToken, authorizeRole } = require("../middleware/auth");
const { gameValidation } = require("../middleware/validation");
const router = express.Router();

router.get("", authenticateToken, getAllGames);
router.post(
  "",
  authenticateToken,
  authorizeRole,
  gameValidation,
  createGame
);

module.exports = router;
