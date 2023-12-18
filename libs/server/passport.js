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
      const data = await client.user.findFirst({
        where: {
          email: username,
          password: password,
        },
      });

      if (data?.email === username) {
        await done(null, {
          id: data.id,
          username,
        });
      } else {
        await done(null, false);
      }
    }
  )
);

export default passport;
