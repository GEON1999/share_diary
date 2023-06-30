import router from "../../../libs/server/router";
import { PrismaClient } from "@prisma/client";

router.post(async (req, res, next) => {
  const client = new PrismaClient();
  console.log(req.body);
  const { diaryContent, diaryTitle, date } = req.body;
  const diary = await client.diary.create({
    data: {
      user: {
        connect: {
          id: Number(1), //추후 passport 를 통해 로그이 유저 아이디 가져오기
        },
      },
      content: diaryContent,
      date: String(date),
      title: diaryTitle,
    },
  });
  console.log(diary);
});

export default router;
