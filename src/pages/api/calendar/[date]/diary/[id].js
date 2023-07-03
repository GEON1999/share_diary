import router from "../../../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";

router.get("/api/calendar/:date/diary/:id", async (req, res, next) => {
  const client = new PrismaClient();
  const { date, id } = req.query;

  console.log(date, id);

  try {
    const diary = await client.diary.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
      },
    });
    console.log(diary);

    return res.status(200).json({ diary, message: "success" });
  } catch (e) {
    console.log(e);
  }
});

export default router;
