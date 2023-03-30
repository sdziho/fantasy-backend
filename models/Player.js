const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false }
);
const GW_INFO_SCHEMA = new mongoose.Schema(
  {
    gw_number: { type: Number, required: true },
    points: { type: Number, required: true },
    mins_played: { type: Number, required: true },
    goals: { type: Number, required: true },
    assists: { type: Number, required: true },
    clean_sheet: { type: Number, required: true },
    goals_conceded: { type: Number, required: true },
    saves: { type: Number, required: true },
    yellow_card: { type: Number, required: true },
    red_card: { type: Number, required: true },
    gw_ownership: { type: Number, required: true },
    gw_price: { type: Number, required: true },
    bonus: { type: Number, required: false },
  },
  { _id: false }
);
const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    gw_points: { type: [GW_INFO_SCHEMA], required: true },
    price: { type: Number, required: true },
    ownership: { type: Number, required: true },
    info: { type: InfoSchema, required: false },
  },
  { versionKey: false }
);
module.exports = mongoose.model("players", PlayerSchema);
