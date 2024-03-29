import router from "../../../../libs/server/router";
import passport from "../../../../libs/server/passport";

router.post("/api/users/enter", async (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    if (err) {
      return res.status(400).send({ error: err });
    }
    if (!user) {
      return res.json({ status: false, msg: "정보가 옳바르지 않습니다." });
    }
    req.login(user, function (err) {
      if (err) {
        return next("err", err);
      } else {
        return res.json({
          success: true,
          msg: "로그인에 성공 했습니다",
          user: { email: user?.username, id: user?.id },
        });
      }
    });
  })(req, res, next);
});

export default router;
