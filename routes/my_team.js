const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const { createNewTeam, getAllTeams } = require("../utils/_my_team");
const { validateMyTeam } = require("../middlewares/player_validation");
//fantasy teams
router.post("/create-my-team", userAuth, validateMyTeam, async (req, res) => {
  await createNewTeam(req, res);
});
router.get("/", userAuth, async (req, res) => {
  await getAllTeams(req, res);
});

module.exports = router;
