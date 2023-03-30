const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const {
  addPlayer,
  getPlayers,
  addGameweekPoints,
  addPlayerInfo,
} = require("../utils/_players");

router.get("/all", userAuth, async (req, res) => {
  await getPlayers(req, res);
});

//this should be only possible for admin
router.post("/add-player", userAuth, async (req, res) => {
  //admin role
  await addPlayer(req, res);
});
router.post("/add-gw-points", userAuth, async (req, res) => {
  //admin role
  await addGameweekPoints(req, res);
});
router.post("/add-info", userAuth, async (req, res) => {
  //admin role
  await addPlayerInfo(req, res);
});

module.exports = router;
