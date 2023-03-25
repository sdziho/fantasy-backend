const mongoose = require("mongoose");
const Player = require("./Player");

const FixtureSchema = new mongoose.Schema({
  vs: { type: String, required: true },
  home: { type: Boolean, required: true },
});
const TeamsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: { type: [Player.schema], required: true },
  fixtures: { type: [FixtureSchema], required: false },
});
module.exports = mongoose.model("teams", TeamsSchema);
