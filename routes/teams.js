const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const { getTeam, getTeams, getListOfPlayers } = require("../utils/_teams");

router.get("/", userAuth, async (req, res) => {
  await getTeam(req, res);
});
router.get("/all", userAuth, async (req, res) => {
  await getTeams(req, res);
});
router.get("/players-list", userAuth, async (req, res) => {
  await getListOfPlayers(req, res);
});

module.exports = router;
