import router from "../../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";

router.post(`/api/calendar/:date/diary`, async (req, res, next) => {
  const client = new PrismaClient();
  const {
    body: { title, content },
    query: { date },
  } = req;

  const diary = await client.diary.create({
    data: {
      user: {
        connect: {
          id: Number(1), //추후 passport 를 통해 로그이 유저 아이디 가져오기
        },
      },
      content,
      date: String(date),
      title,
    },
  });
});

/*router.get(`/api/calendar/:date/diary`, async (req, res, next) => {
  console.log(req.query, req.body);
});*/

export default router;
