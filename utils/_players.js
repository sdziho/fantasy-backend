const Player = require("../models/Player");
const Teams = require("../models/Teams");
const mongoose = require("mongoose");

const addPlayer = async (req, res) => {
  let body = req.body;

  try {
    let id = new mongoose.Types.ObjectId();
    const newPlayer = new Player({
      _id: id.toString(),
      name: body.name,
      position: body.position,
      gw_points: [],
      price: body.price,
      ownership: 0,
    });

    newPlayer.save();
    await Teams.findOneAndUpdate(
      { name: body.team },
      { $push: { players: id } },
      { returnOriginal: false }
    );

    return res.status(201).json({
      message: "New player successfully added.",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const addGameweekPoints = async (req, res) => {
  let body = req.body;
  try {
    if ("_id" in body) {
      let player = await Player.findById(body._id);

      let info = {
        gw_number: body.gw_number,
        mins_played: body.mins_played,
        goals: body.goals,
        assists: body.assists,
        clean_sheet: body.clean_sheet,
        goals_conceded: body.goals_conceded,
        saves: body.saves,
        yellow_card: body.yellow_card,
        red_card: body.red_card,
        gw_price: player.price, //first we need to update global price and owenership than gw price and ownership
        gw_ownership: player.ownership, //first we need to update global price and owenership than gw price and ownership
      };
      info["points"] = calculatePoints(body, player.position);
      info = calculateBonusPts(info, 0);
      let gameweek = player.gw_points.find(
        (element) => element.gw_number == body.gw_number
      );

      if (!gameweek) {
        await Player.findOneAndUpdate(
          { _id: body._id },
          { $push: { gw_points: info } },
          { returnOriginal: false }
        );
      } else {
        let pts = player.gw_points;
        for (let i = 0; i < pts.length; i++) {
          if (pts[i].gw_number == body.gw_number) {
            pts[i] = info;
            break;
          }
        }

        await Player.findOneAndUpdate(
          { _id: body._id },
          { $set: { gw_points: pts } },
          { new: true }
        );
      }
      return res.status(201).json({
        message: "Gw points successfully added.",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Id Doesn't Exist.",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const getPlayers = async (req, res) => {
  try {
    const teams = await Player.find({});
    return res.status(200).json(teams);
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.body._id);
    return res.status(200).json(player);
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const addPlayerInfo = async (req, res) => {
  let body = req.body;
  try {
    if ("_id" in body) {
      await Player.findOneAndUpdate(
        { _id: body._id },
        {
          $set: {
            info: {
              message: body.message,
              color: body.color,
            },
          },
        },
        { new: true }
      );

      return res.status(201).json({
        message: "Player info successfully added.",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Id Doesn't Exist.",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const calculatePoints = (body, position) => {
  let total_pts = 0;
  if (body.mins_played > 0) total_pts++;
  if (body.mins_played >= 60) total_pts++;

  total_pts += body.goals * 4;
  total_pts += body.assists * 3;
  total_pts -= body.yellow_card;
  total_pts -= body.red_card * 2;
  //ovdje ce trebati dodati kada je neko izasao iz igre a kasnije primili goal
  if (position == "DEF") {
    total_pts += body.goals * 2;
    total_pts += body.clean_sheet * 4;
    total_pts -= Math.floor(body.goals_conceded / 2);
  } else if (position == "GK") {
    total_pts += body.goals * 2;
    total_pts += body.clean_sheet * 4;
    total_pts -= Math.floor(body.goals_conceded / 2);
    total_pts += Math.floor(body.saves / 3);
  } else if (position == "MID") {
    total_pts += body.goals;
    total_pts += body.clean_sheet;
  }

  return total_pts;
};

const calculateBonusPts = (info, number) => {
  if (number > 3) return info;
  info["bonus"] = number;
  info.points += number;
  return info;
};

module.exports = {
  addPlayer,
  getPlayers,
  addGameweekPoints,
  addPlayerInfo,
  getPlayer,
};
