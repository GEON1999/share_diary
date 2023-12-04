import router from "../../../../libs/server/router";
import passport from "passport";
import config from "next.config";
import { Strategy as KakaoStrategy } from "passport-kakao";
import client from "../../../../libs/server/client";

router.get("/api/auth/kakao", async (req, res, next) => {
  passport.authenticate("kakao", {
    failureRedirect: "#!/login",
  }),
    (req, res) => {};
});

export default router;
