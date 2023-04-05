const Teams = require("../models/Teams");
const Player = require("../models/Player");

const getTeam = async (req, res) => {
  let body = req.body;
  try {
    if ("_id" in body) {
      const team = await Teams.findById(body._id);

      return res.status(200).json(team);
    } else {
      return res.status(401).json({
        message: "Wrong Body Params",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const getTeams = async (req, res) => {
  try {
    const teams = await Teams.find({});
    return res.status(200).json(teams);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const getListOfPlayers = async (req, res) => {
  let body = req.body;
  try {
    const team = await Teams.findById(body._id);

    const players = await Player.find({ _id: { $in: team.players } });

    return res.status(200).json(players);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};

module.exports = {
  getTeam,
  getTeams,
  getListOfPlayers,
};
