const mongoose = require("mongoose");
const playersLengthValidator = (val) => {
  return val.length === 15;
};
const GW_HISTORY_SCHEMA = new mongoose.Schema({
  gw_number: { type: Number, required: true },
  players: { type: [String], required: true },
  points: { type: Number, required: true },
  active: { type: Boolean, required: true },
});

const MyTeamSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    players: {
      type: [String],
      required: true,
      validate: [playersLengthValidator, "15 Players required"],
    },
    gw_history: { type: [GW_HISTORY_SCHEMA], required: true },
    free_transfers: { type: Number, required: true },
    total_points: { type: Number, required: true },
    leagues: { type: [String], required: true },
  },
  { versionKey: false }
);
module.exports = mongoose.model("fantasy_teams", MyTeamSchema);
