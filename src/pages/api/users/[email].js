import client from "../../../../libs/server/client";
import router from "../../../../libs/server/router";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
router.get('/api/users/:username',async (req, res, next) => {
    console.log('hi user')
    const {email} = req.query
    try {
        const user = await client.user.findFirst({where:{email}})
        console.log('user',user)

        return res.status(200).json({data:user})
    } catch {
        return res.status(500).json({message:'유저가 존재하지 않습니다.'})
    }
})

export default router