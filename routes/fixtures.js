const router = require("express").Router();
const { userAuth } = require("../utils/Auth");
const {
  getAllFixtures,
  getGameweekFixtures,
  addNewFixture,
} = require("../utils/_fixtures");

router.get("/", userAuth, async (req, res) => {
  await getAllFixtures(req, res);
});
router.get("/get-gameweek-fixture", userAuth, async (req, res) => {
  await getGameweekFixtures(req, res);
});

//admin role
router.post("/add-new-fixture", userAuth, async (req, res) => {
  await addNewFixture(req, res);
});

module.exports = router;
