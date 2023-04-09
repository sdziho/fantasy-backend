const mongoose = require("mongoose");

const TeamsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    players: { type: [String], required: true },
    fixtures: { type: [String], required: false },
  },
  { versionKey: false }
);
module.exports = mongoose.model("teams", TeamsSchema);
