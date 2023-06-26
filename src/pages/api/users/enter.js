import nextConnect from 'next-connect'
import passport from "passport";
var KakaoStrategy = require('passport-kakao').Strategy
import client from "../../../../libs/server/client";
import config from "next.config"
import router from "../../../../libs/server/router";

router.post(async (req, res, next) => {
    console.log('hi')
    passport.use(
        new KakaoStrategy({
            clientID: config.kakao.clientID,
            callbackURL: config.kakao.callbackURL
        },
              (accessToken, refreshToken, profile, done) => {
            console.log(profile)
               const user = client.user.findUnique({where:{id:profile.id}})
                  console.log('user', user)

                if(!user){
                    const user =  client.User.create({
                        data:{
                            id:profile.id,
                        }
                    })
                    console.log(user)
                }
    }))
    console.log('data',req.body)
})

export default  router