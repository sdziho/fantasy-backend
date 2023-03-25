const router = require("express").Router();

const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
} = require("../utils/Auth");

router.get("/", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});
router.post("/register", async (req, res) => {
  await userRegister(req, res);
});
router.post("/login", async (req, res) => {
  await userLogin(req, res);
});

module.exports = router;
