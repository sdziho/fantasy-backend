const mongoose = require("mongoose");
const moment = require("moment");
const ResultsSchema = new mongoose.Schema(
  {
    home: { type: Number, required: true },
    away: { type: Number, required: true },
  },
  { versionKey: false }
);

const pairValidaotr = (val) => {
  return val.length === 2;
};
const FixtureSchema = new mongoose.Schema(
  {
    gameweek: { type: Number, required: true },
    pair: {
      type: [String],
      required: true,
      validate: [pairValidaotr, "Wrong pair data"],
    },
    time: {
      type: Date,
      required: true,
      set: function (v) {
        // Set date value from string input
        const d = moment.utc(v, "DD.MM.YYYY HH:mm");
        // If invalid input, return undefined
        if (!d.isValid()) {
          return undefined;
        }
        // Set date value to UTC timestamp
        return d.valueOf();
      },
      get: function (v) {
        // Get date value from UTC timestamp
        if (!v) {
          return undefined;
        }
        return format(v, "dd.MM.yyyy HH:mm");
      },
    },
    result: { type: ResultsSchema, required: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model("fixtures", FixtureSchema);
