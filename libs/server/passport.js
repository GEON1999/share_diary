import client from "./client";

const passport = require("passport");
import axios from "axios";
import LocalStrategy from "passport-local";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      console.log("username", username);
      const data = await client.user.findFirst({
        where: {
          email: username,
          password: password,
        },
      });
      console.log("data", data);
      if (data?.email === username) {
        await done(null, {
          username,
        });
      } else {
        await done(null, false);
      }
    }
  )
);

export default passport;
