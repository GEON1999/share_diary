import router from "../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";

router.get(`/api/calendar/diaries`, async (req, res, next) => {
  const client = new PrismaClient();
  const { date } = req?.query;
  console.log("date", date);
  const diaries = await client.diary.findMany({
    where: {
      date,
    },
    include: {
      user: true,
    },
  });

  return res.status(200).json({ diaries, message: "success" });
});

export default router;
