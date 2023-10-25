import router from "../../../../libs/server/router";
import passport from "../../../../libs/server/passport";

router.post("/api/users/enter", async (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) {
      console.log("err", err);
      return res.status(400).send({ error: err });
    }
    if (!user) {
      return res.json({ status: "no", msg: "정보가 옳바르지 않습니다." });
    }
    req.login(user, function (err) {
      console.log("123");
      if (err) {
        console.log("11", err);
        return next("11", err);
      }
      return (
        console.log("11", user),
        res.json({ message: "success", user: { email: user?.username } })
      );
    });
  })(req, res, next);
});

export default router;
