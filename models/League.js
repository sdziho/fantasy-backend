const mongoose = require("mongoose");

const LeaguesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    participants: { type: [String], required: true },
    code: { type: Number, required: false, unique: true },
    admin: { type: String, required: false },
  },
  { versionKey: false }
);

LeaguesSchema.statics.generateCode = async function () {
  const totalPossibleCodes = 900000;
  let codesInUse = await this.countDocuments();

  if (codesInUse >= totalPossibleCodes) {
    throw new Error("All possible codes have already been taken");
  }

  while (true) {
    const randomCode = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    );
    const codeExists = await this.findOne({ code: randomCode });
    if (!codeExists) {
      return randomCode;
    }
  }
};
module.exports = mongoose.model("leagues", LeaguesSchema);
