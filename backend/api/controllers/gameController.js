const Game = require("../models/Game");
const { getGames } = require("../services/gameService");

const getAllGames = async (req, res) => {
  try {
    const games = await getGames();
    res.json({ games });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createGame = async (req, res) => {
  const game = req.body;

  await Game.create(game);

  res.status(201);
}

module.exports = { getAllGames, createGame };
