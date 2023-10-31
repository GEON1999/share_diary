import router from "../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";
import client from "../../../../libs/server/client";

router.get(`/api/calendar`, async (req, res, next) => {
  const user = req.user;

  console.log("user :", user);
  try {
    const calendars = await client.calendar.findMany({
      where: {
        userId: Number(user.id),
      },
    });

    console.log("calendars :", calendars);

    return res
      .status(200)
      .json({ isSuccess: true, calendars, message: "success" });
  } catch (e) {
    console.log("e :", e);
    return res.status(500).json({ isSuccess: false, message: e.message });
  }
});

export default router;
