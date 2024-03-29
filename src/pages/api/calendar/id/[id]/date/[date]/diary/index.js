import router from "../../../../../../../../../libs/server/router";
import { PrismaClient } from "@prisma/client";
import client from "../../../../../../../../../libs/server/client";
import API from "@/API";

router.get(
  API.GET_DIARY(":id", ":date"),
  router.isAuthenticated,
  async (req, res, next) => {
    const user = req.user;
    const { id, date, userId } = req?.query;

    try {
      const diary = await client.diary.findMany({
        where: {
          calendarId: Number(id),
          date: date,
        },
        include: {
          user: true,
        },
      });

      let diaryList = [];

      for (const item of diary) {
        const profile = await client.calendarUserProfile.findFirst({
          where: {
            userId: Number(item.user.id),
            calendarId: Number(id),
          },
        });
        diaryList.push({
          ...item,
          name: profile?.name,
        });
      }

      return res.status(200).json({
        isSuccess: true,
        diaryList,
        message: "success",
      });
    } catch (e) {
      return res.status(500).json({ isSuccess: false, message: e.message });
    }
  }
);

router.post(
  API.POST_DIARY(":id", ":date"),
  router.isAuthenticated,
  async (req, res, next) => {
    const user = req.user;

    const {
      body: { title, content, img },
      query: { date, id },
    } = req;

    try {
      const diary = await client.diary.create({
        data: {
          user: {
            connect: {
              id: user.id, //추후 passport 를 통해 로그이 유저 아이디 가져오기
            },
          },
          calendar: {
            connect: {
              id: Number(id),
            },
          },

          content,
          date,
          title,
          img,
        },
      });
      res.status(200).json({ diary, message: "success" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "fail" });
    }
  }
);

export default router;
