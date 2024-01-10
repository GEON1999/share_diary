import client from "../../../../libs/server/client";
import API from "@/API";
import router from "../../../../libs/server/router";

router.get(
  API.GET_CALENDAR_LIST(),
  router.isAuthenticated,
  async (req, res, next) => {
    const { userId } = req.query;

    try {
      const permission = await client.calendarPermission.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          calendar: true,
        },
      });

      return res
        .status(200)
        .json({ isSuccess: true, calendars: permission, message: "success" });
    } catch (e) {
      return res.status(500).json({ isSuccess: false, message: e.message });
    }
  }
);

router.post(API.CREATE_CALENDAR(), async (req, res, next) => {
  const {
    body: { name },
    user,
  } = req;

  const findUser = await client.user.findFirst({
    where: {
      id: Number(user.id),
    },
  });

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

    const calendarUserProfile = await client.calendarUserProfile.create({
      data: {
        calendarId: calendar.id,
        userId: user.id,
        name: findUser?.name ?? "",
        color: "",
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
