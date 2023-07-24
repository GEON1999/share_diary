import nextConnect from "next-connect";
import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";

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

export default router;
