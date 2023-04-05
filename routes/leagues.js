const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const {
  createNewLeague,
  joinLeague,
  leaveLeague,
  getLeague,
  getAllLeagues,
  deleteLeague,
} = require("../utils/_leagues");

//fantasy teams
router.get("/", userAuth, async (req, res) => {
  await getAllLeagues(req, res);
});
router.get("/get-league", userAuth, async (req, res) => {
  await getLeague(req, res);
});
router.post("/create-new-league", userAuth, async (req, res) => {
  await createNewLeague(req, res);
});
router.post("/join-league", userAuth, async (req, res) => {
  await joinLeague(req, res);
});
router.post("/leave-league", userAuth, async (req, res) => {
  await leaveLeague(req, res);
});
router.post("/delete-league", userAuth, async (req, res) => {
  await deleteLeague(req, res);
});

module.exports = router;
