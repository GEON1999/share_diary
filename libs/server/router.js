import nextConnect from "next-connect";
import session from "cookie-session";
import passport from "./passport";

/*

passport.use(
    new KakaoStrategy({
            clientID: '66470a9e06c694f1623b4aaa5363487e',
            callbackURL: 'http://localhost:3000/oauth'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            const user = client.user.findUnique({where:{id:profile.id}})
            console.log('user', user)

            if(!user){
                const user =  client.user.create({
                    data:{
                        id:profile.id,
                    }
                })
                console.log(user)
            }
            return done(null, profile)
        }))
*/

const router = nextConnect({ attachParams: true });

const whitelist = ["/api/users/enter", "/login", "/join", "/api/users/join"];

router.isAuthenticated = (req, res, next) => {
  if (whitelist.includes(req?.url)) return next();
  const auth = req?.headers?.ssrkey ?? null;
  console.log("router auth : ", auth);
  if (
    req?.isAuthenticated() ||
    auth === process.env.AXIOS_AUTHORIZATION_SECRET
  ) {
    return next();
  } else {
    return res.json({ auth: false });
  }
};

router.use(
  session({
    keys: ["CALENDAR_SESSION"],
    maxAge: 1000 * 60 * 60 * 24 * 1,
  })
);

router.use(passport.initialize());
router.use(passport.session());

export default router;
