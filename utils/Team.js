const Teams = require("../models/Teams");

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
    // Implement logger function (winston)
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
    // Implement logger function (winston)
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
};
