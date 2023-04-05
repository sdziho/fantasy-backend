const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const { DB, PORT } = require("./config");
const { connect } = require("mongoose");
const { success, error } = require("consola");

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));

require("./middlewares/passport")(passport);
app.use("/api/users", require("./routes/users"));
app.use("/api/teams", require("./routes/teams"));
app.use("/api/players", require("./routes/players"));
app.use("/api/my-team", require("./routes/my_team"));
app.use("/api/leagues", require("./routes/leagues"));
app.use("/api/fixtures", require("./routes/fixtures"));
const startApp = async () => {
  try {
    await connect(DB, {
      dbName: "fantasyBiH",
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    });

    app.listen(process.env.PORT || PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true,
    });
    startApp();
  }
};

startApp();
