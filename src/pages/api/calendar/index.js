import router from "../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";
import client from "../../../../libs/server/client";

router.get(`/api/calendar`, async (req, res, next) => {
  const user = req.user;

  console.log("user :", user);
  try {
    const permission = await client.calendarPermission.findMany({
      where: {
        userId: Number(user.id),
      },
      include: {
        calendar: true,
      },
    });
    console.log("permission :", permission);
    const calendars = await client.calendar.findMany({
      where: {
        calendarPermissions: {
          some: {
            userId: Number(user.id),
          },
        },
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

router.post(`/api/calendar`, async (req, res, next) => {
  const user = req.user;

  const {
    body: { name },
  } = req;

  console.log("name :", name);

  try {
    const calendar = await client.calendar.create({
      data: {
        name,
      },
    });

    console.log("calendar :", calendar);

    if (!calendar) {
      return res.json({ message: "fail" });
    }

    await client.calendarPermission.create({
      data: {
        calendarId: calendar.id,
        userId: user.id,
        role: "OWNER",
      },
    });

    await client.inviteCode.create({
      data: {
        calendarId: calendar.id,
        code: Math.random().toString(36).substr(2, 11), // 추후 hash 를 통해 더 안전하게
      },
    });

    res.status(200).json({ calendar, message: "success", isSuccess: true });
  } catch (e) {
    console.log(e);
    res.json({ message: "fail" });
  }
});

export default router;
