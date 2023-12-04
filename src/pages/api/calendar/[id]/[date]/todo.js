import router from "../../../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";

router.post(`/api/calendar/:date/todo`, async (req, res, next) => {
  const client = new PrismaClient();

  const {
    body: { title, content },
    query: { date },
  } = req;

  const todo = await client.todo.create({
    data: {
      user: {
        connect: {
          id: Number(1), //추후 passport 를 통해 로그이 유저 아이디 가져오기
        },
      },
      content,
      date: String(date),
    },
  });
});

export default router;
