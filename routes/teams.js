const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const { getTeam, getTeams } = require("../utils/Team");

router.get("/", userAuth, async (req, res) => {
  await getTeam(req, res);
});
router.get("/all", userAuth, async (req, res) => {
  await getTeams(req, res);
});

module.exports = router;
