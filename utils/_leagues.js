const League = require("../models/League");
const MyTeam = require("../models/MyTeam");

const joinLeague = async (req, res) => {
  try {
    const league = await League.findOneAndUpdate(
      { code: req.body.code },
      { $addToSet: { participants: req.user._id } },
      { returnOriginal: false }
    );
    await MyTeam.findOneAndUpdate(
      { user_id: req.user._id },
      { $addToSet: { leagues: league._id } },
      { returnOriginal: false }
    );

    return res.status(200).json({
      message: "Successifuly Joined League",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const leaveLeague = async (req, res) => {
  try {
    const league = await League.findOneAndUpdate(
      { _id: req.body._id },
      { $pull: { participants: req.user._id } },
      { returnOriginal: false }
    );
    await MyTeam.findOneAndUpdate(
      { user_id: req.user._id },
      { $pull: { leagues: league._id } },
      { returnOriginal: false }
    );
    return res.status(200).json({
      message: "Successifuly Left League",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};

const createNewLeague = async (req, res) => {
  try {
    newCode = await League.generateCode();
    const newLeague = new League({
      name: req.body.name,
      code: newCode,
      participants: [req.user._id],
      admin: req.user._id,
    });

    newLeague.save();
    await MyTeam.findOneAndUpdate(
      { user_id: req.user._id },
      { $addToSet: { leagues: newLeague._id } },
      { returnOriginal: false }
    );
    return res.status(200).json({
      code: newCode,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const deleteLeague = async (req, res) => {
  try {
    const newLeague = await League.findOne({ _id: req.body._id });

    if (newLeague.admin == req.user._id) {
      await League.deleteOne({ _id: req.body._id });
      return res.status(200).json({
        message: "League Successifuly Deleted",
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "Unable To Delete League",
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
const getAllLeagues = async (req, res) => {
  try {
    const leagues = await League.find({});
    return res.status(200).json(leagues);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const getLeague = async (req, res) => {
  try {
    const leagues = await League.findById(req.body._id);
    return res.status(200).json(leagues);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};

module.exports = {
  createNewLeague,
  joinLeague,
  leaveLeague,
  getAllLeagues,
  getLeague,
  deleteLeague,
};
