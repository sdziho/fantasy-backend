const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
  message: { type: String, required: true },
  color: { type: String, required: true },
});
const GW_INFO_SCHEMA = new mongoose.Schema({
  points: { type: Number, required: true },
  mins_played: { type: Number, required: true },
  goals: { type: Number, required: true },
  assists: { type: Number, required: true },
  clean_sheets: { type: Number, required: true },
  goals_conceded: { type: Number, required: true },
  saves: { type: Number, required: true },
  yellow_card: { type: Number, required: true },
  red_cards: { type: Number, required: true },
});
const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  gw_points: { type: [GW_INFO_SCHEMA], required: true },
  price: { type: Number, required: true },
  ownership: { type: Number, required: true },
  info: { type: InfoSchema, required: false },
});
module.exports = mongoose.model("players", PlayerSchema);
