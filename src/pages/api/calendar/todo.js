import router from "../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";

router.get(`/api/calendar/todo`, async (req, res, next) => {
  const client = new PrismaClient();
  const { date } = req.query;
  const todo = await client.todo.findMany({
    where: {
      date: String(date),
    },
    include: {
      user: true,
    },
  });

  return res.status(200).json({ todo, message: "success" });
});

export default router;
