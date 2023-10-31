import router from "../../../../libs/server/router";
import passport from "../../../../libs/server/passport";

router.post("/api/users/enter", async (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) {
      console.log("err", err);
      return res.status(400).send({ error: err });
    }
    if (!user) {
      return res.json({ status: false, msg: "정보가 옳바르지 않습니다." });
    }
    req.login(user, function (err) {
      if (err) {
        console.log("err", err);
        return next("err", err);
      }
      return (
        console.log("user :", user),
        res.json({
          success: true,
          msg: "로그인에 성공 했습니다",
          user: { email: user?.username, id: user?.id },
        })
      );
    });
  })(req, res, next);
});

export default router;
