/*import nextConnect from 'next-connect'
import passport from "passport";
var KakaoStrategy = require('passport-kakao').Strategy
import config from "next.config"*/
import router from "../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
// router.post(async (req, res, next) => {
//     console.log('hi')
//     passport.use(
//         new KakaoStrategy({
//             clientID: config.kakao.clientID,
//             callbackURL: config.kakao.callbackURL,
//         },
//               (accessToken, refreshToken, profile, done) => {
//             console.log(profile)
//                const user = client.user.findUnique({where:{id:profile.id}})
//                   console.log('user', user)
//
//                 if(!user){
//                     const user =  client.User.create({
//                         data:{
//                             id:profile.id,
//                         }
//                     })
//                     console.log(user)
//                 }
//     }))
//     console.log('data',req.body)
// })

router.post("/api/users/enter", async (req, res, next) => {
  const { id, pw } = req?.body;
  console.log("id:", id, "pw:", pw);

  const user = await client.user.findFirst({
    where: {
      email: id,
      password: pw,
    },
  });

  if (user) {
    console.log("user:", user);
    return res.status(200).json({ message: "success", user });
  } else {
    console.log("error");
    /* const newUser = await client.user.create({
      data: {
        email: id,
        password: pw,
      },
    });
    console.log("newUser:", newUser);
    return res.status(200).json({ message: "success", newUser });*/
    return res.status(500).json({ message: "wrong user" });
  }
});

export default router;
