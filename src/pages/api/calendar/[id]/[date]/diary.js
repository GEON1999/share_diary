import router from "../../../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";
import client from "../../../../../../libs/server/client";

router.post(`/api/calendar/:id/:date/diary`, async (req, res, next) => {
  console.log("hi");

  const user = req.user;

  const {
    body: { title, content },
    query: { date, id },
  } = req;

  console.log(title, content, date);

  try {
    const diary = await client.diary.create({
      data: {
        user: {
          connect: {
            id: user.id, //추후 passport 를 통해 로그이 유저 아이디 가져오기
          },
        },
        calendar: {
          connect: {
            id: Number(id),
          },
        },

        content,
        date,
        title,
      },
    });
    res.status(200).json({ diary, message: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "fail" });
  }
});

/*router.get(`/api/calendar/:date/diary`, async (req, res, next) => {
  console.log(req.query, req.body);
});*/

export default router;
