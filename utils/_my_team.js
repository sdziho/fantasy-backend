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
    updateOwnership(req.body.players, 1); //UPDATE OWNERSHIP
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

const updateTeam = async (req, res) => {
  try {
    const user = serializeUser(req.user);

    const myteam = await MyTeam.findOne({ user_id: user._id });
    const removedPlayers = myteam.players.filter(
      (player) => !req.body.players.includes(player)
    );
    const addedPlayers = req.body.players.filter(
      (player) => !myteam.players.includes(player)
    );
    if (removedPlayers.length === 0) {
      return res.status(200).json({
        message: "Everything is up to date",
        success: true,
      });
    }
    if (removedPlayers.length == addedPlayers.length) {
      const _myteam = await MyTeam.findOneAndUpdate(
        { user_id: user._id },
        {
          $set: {
            players: req.body.players,
            total_points:
              myteam.total_points -
              (removedPlayers.length - myteam.free_transfers) * 4,
          },
        },
        { returnOriginal: false }
      );

      _myteam.set({ free_transfers: removedPlayers.length });
      _myteam.save();
    } else {
      return res.status(500).json({
        message: "Something went wrong",
        success: false,
      });
    }

    updateOwnership(addedPlayers, 1); //UPDATE OWNERSHIP
    updateOwnership(removedPlayers, -1); //UPDATE OWNERSHIP
    return res.status(200).json({
      message: "Team Successifuly Updated",
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
const updateOwnership = async (ids, inc = 1) => {
  for (let _id of ids) {
    const player = await Player.findOneAndUpdate(
      { _id: _id },
      { $inc: { ownership: inc } },
      { new: true }
    );
  }
};
module.exports = {
  createNewTeam,
  getAllTeams,
  updateTeam,
};
