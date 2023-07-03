import router from "../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";

router.get(async (req, res, next) => {
  const client = new PrismaClient();
  const { date } = req.query;

  const diary = await client.diary.findMany({
    where: {
      date,
    },
    include: {
      user: true,
    },
  });
  console.log(diary);

  return res.status(200).json({ diary, message: "success" });
});

export default router;
