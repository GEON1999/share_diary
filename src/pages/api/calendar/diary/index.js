import router from "../../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";

router.get(async (req, res, next) => {
  const client = new PrismaClient();
  const { date } = req.query;

  try {
    const diary = await client.diary.findUnique({
      where: {
        id: Number(date),
      },
      include: {
        user: true,
      },
    });

    return res.status(200).json({ diary, message: "success" });
  } catch (e) {
    console.log(e);
  }
});

router.post("/api/calendar/:date/diary", async (req, res, next) => {
  const client = new PrismaClient();
  const {
    body: { title, content },
    query: { date },
  } = req;

  try {
    const diary = await client.diary.update({
      where: {
        id: Number(date),
      },
      data: {
        title,
        content,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

export default router;
