import API from "@/API";
import router from "../../../../libs/server/router";
import client from "../../../../libs/server/client";

router.get(
  API.GET_USER(":id"),
  router.isAuthenticated,
  async (req, res, next) => {
    const { id, userId } = req?.query;

    try {
      const user = await client.user.findFirst({
        where: {
          id: Number(id),
        },
      });

      const now = new Date();
      const sevenDaysAgo = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );

      // 밀리초 단위의 타임스탬프로 변환
      const nowTimestamp = now.getTime().toString();
      const sevenDaysAgoTimestamp = sevenDaysAgo.getTime().toString();

      const calendar = await client.calendarPermission.findMany({
        where: {
          userId: Number(id),
        },
        include: {
          calendar: {
            include: {
              todos: {
                where: {
                  // 문자열로 저장된 날짜가 최근 7일 이내인 경우만 필터링
                  date: {
                    gte: sevenDaysAgoTimestamp,
                    lte: nowTimestamp,
                  },
                },
              },
              diaries: {
                where: {
                  // 같은 조건을 다이어리에도 적용
                  date: {
                    gte: sevenDaysAgoTimestamp,
                    lte: nowTimestamp,
                  },
                },
              },
            },
          },
        },
      });
      console.log("calendar :", calendar, "user :", user, "hi");

      const data = {
        user,
        calendar,
      };

      return res
        .status(200)
        .json({ isSuccess: true, data, message: "success" });
    } catch (e) {
      console.log("e :", e);
      return res.status(500).json({ isSuccess: false, message: e.message });
    }
  }
);

/*router.post(
    API.EDIT_USER(":id"),
    router.isAuthenticated,
    async (req, res, next) => {
        const {
            body: { name, img },
            query: { id },
        } = req;

        console.log("body :", req.body, "hi");

        try {
            const calendar = await client.calendar.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name,
                    img,
                },
            });

            return res.status(200).json({ isSuccess: true, calendar });
        } catch (e) {
            return res.json({ isSuccess: false, message: e.message });
        }
    }
);*/

export default router;
