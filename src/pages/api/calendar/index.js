import router from "../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";
import client from "../../../../libs/server/client";
import API from "@/API";

router.get(API.GET_CALENDAR_LIST(), async (req, res, next) => {
  const user = req.user;

  try {
    const permission = await client.calendarPermission.findMany({
      where: {
        userId: Number(user.id),
      },
      include: {
        calendar: true,
      },
    });
    const calendars = await client.calendar.findMany({
      where: {
        calendarPermissions: {
          some: {
            userId: Number(user.id),
          },
        },
      },
    });

    return res
      .status(200)
      .json({ isSuccess: true, calendars, message: "success" });
  } catch (e) {
    return res.status(500).json({ isSuccess: false, message: e.message });
  }
});

router.post(API.CREATE_CALENDAR(), async (req, res, next) => {
  const user = req.user;

  const {
    body: { name },
  } = req;

  try {
    const calendar = await client.calendar.create({
      data: {
        name,
      },
    });

    if (!calendar) {
      return res.json({ message: "캘린더를 생성하지 못했습니다." });
    }

    const calendarPermission = await client.calendarPermission.create({
      data: {
        calendarId: calendar.id,
        userId: user.id,
        role: "OWNER",
      },
    });

    if (!calendarPermission) {
      return res.json({ message: "캘린더 권한을 생성하지 못했습니다." });
    }

    /*await client.inviteCode.create({
      data: {
        calendarId: calendar.id,
        code: Math.random().toString(36).substr(2, 11), // 추후 hash 를 통해 더 안전하게
      },
    });*/

    const calendarUserProfile = await client.calendarUserProfile.create({
      data: {
        calendarId: calendar.id,
        userId: user.id,
        name: user.name,
      },
    });

    if (!calendarUserProfile) {
      return res.json({ message: "캘린더 프로필을 생성하지 못했습니다." });
    }

    res.status(200).json({ calendar, message: "success", isSuccess: true });
  } catch (e) {
    console.log(e);
    res.json({ message: "실패했습니다." });
  }
});

export default router;
