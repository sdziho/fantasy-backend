const Fixture = require("../models/Fixture");
const Team = require("../models/Teams");

const getAllFixtures = async (req, res) => {
  try {
    const fixtures = await Fixture.find({});
    return res.status(200).json(fixtures);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const getGameweekFixtures = async (req, res) => {
  try {
    const fixtures = await Fixture.find({ gameweek: req.body.gameweek });
    return res.status(200).json(fixtures);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const addNewFixture = async (req, res) => {
  try {
    const newFixture = new Fixture({
      gameweek: req.body.gameweek,
      pair: req.body.pair,
      time: req.body.time,
    });

    newFixture.save();
    const filter = {
      $or: [{ name: req.body.pair[0] }, { name: req.body.pair[1] }],
    };
    const update = {
      $addToSet: { fixtures: newFixture._id },
    };
    const options = {
      multi: true,
      new: true,
    };
    const team = await Team.updateMany(filter, update, options);
    console.log(team);
    return res.status(201).json({
      message: "Fixture successfully added.",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};

module.exports = { getAllFixtures, getGameweekFixtures, addNewFixture };
