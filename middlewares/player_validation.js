const Player = require("../models/Player");

const validatePlayers = async (req, res, next) => {
  const players = req.body.players; // assuming players are in the request body

  // Check if there are any duplicate players
  const uniquePlayers = new Set(players);
  if (uniquePlayers.size !== players.length) {
    return res.status(500).json({
      message: "Duplicate players found",
      success: false,
    });
  }
  const _players = await Player.find({ _id: { $in: players } });
  let positions = { GK: 0, MID: 0, DEF: 0, FWD: 0 };
  _players.forEach((player) => {
    positions[player.position] += 1;
  });

  if (
    positions.GK !== 2 ||
    positions.MID !== 5 ||
    positions.DEF !== 5 ||
    positions.FWD !== 3
  ) {
    return res.status(500).json({
      message: "Wrong team schema sent",
      success: false,
    });
  }

  // No errors, move on to the next middleware
  next();
};

module.exports = {
  validatePlayers,
};
