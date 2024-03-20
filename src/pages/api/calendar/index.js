import client from "../../../../libs/server/client";
import API from "@/API";
import router from "../../../../libs/server/router";

router.get(
  API.GET_CALENDAR_LIST(),
  router.isAuthenticated,
  async (req, res, next) => {
    const { userId } = req.query;

    // 오늘의 날짜를 구하고, 시간, 분, 초를 0으로 설정하여 오늘 자정의 시간을 생성
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // 오늘부터 7일 후의 날짜를 계산
    const sevenDaysFromToday = new Date(
      todayStart.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    // 밀리초 단위의 타임스탬프로 변환
    const todayStartTimestamp = todayStart.getTime().toString();
    const sevenDaysFromTodayTimestamp = sevenDaysFromToday.getTime().toString();
    try {
      const permission = await client.calendarPermission.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          calendar: {
            include: {
              todos: {
                where: {
                  date: {
                    gte: todayStartTimestamp,
                    lte: sevenDaysFromTodayTimestamp,
                  },
                },
                orderBy: {
                  date: "asc", // 'createdAt'을 기준으로 내림차순 정렬
                },
              },
              /*  diaries: {
              take: 5, // 최대 5개의 다이어리만 가져옵니다.
              where: {
                date: {
                  gte: todayStartTimestamp,
                  lte: sevenDaysFromTodayTimestamp,
                },
              },
            },*/
            },
          },
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
