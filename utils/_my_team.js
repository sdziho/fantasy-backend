const Teams = require("../models/Teams");
const Player = require("../models/Player");
const MyTeam = require("../models/MyTeam");
const { serializeUser } = require("../utils/Auth");
const createNewTeam = async (req, res) => {
  try {
    const user = serializeUser(req.user);
    //console.log(req.user._id);
    //provjeriti da li postoji vec tim sa IDom od usera
    const myteam = await MyTeam.find({ user_id: user._id });

    if (myteam.length != 0) {
      return res.status(500).json({
        message: "Team Already Created",
        success: false,
      });
    }
    const myNewTeam = new MyTeam({
      user_id: user._id,
      name: req.body.name,
      players: req.body.players,
      gw_history: [],
      free_transfers: 1,
      total_points: 0,
      leagues: [],
    });

    myNewTeam.save();
    //UPDATE OWNERSHIP
    return res.status(200).json({
      message: "Team Successifuly Created",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const getAllTeams = async (req, res) => {
  try {
    const teams = await MyTeam.find({});
    return res.status(200).json(teams);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
module.exports = {
  createNewTeam,
  getAllTeams,
};
