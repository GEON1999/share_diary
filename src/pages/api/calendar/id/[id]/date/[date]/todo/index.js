import router from "../../../../../../../../../libs/server/router";
import client from "../../../../../../../../../libs/server/client";
import API from "@/API";

router.get(
  API.GET_TODO(":id", ":date"),
  router.isAuthenticated,
  async (req, res, next) => {
    const user = req.user;
    const { id, date } = req?.query;

    try {
      const todo = await client.todo.findMany({
        where: {
          calendarId: Number(id),
          date: date,
        },
        include: {
          user: true,
        },
      });

      let todoList = [];

      for (const item of todo) {
        const profile = await client.calendarUserProfile.findFirst({
          where: {
            userId: Number(item.user.id),
            calendarId: Number(id),
          },
        });
        todoList.push({
          ...item,
          name: profile?.name,
        });
      }

      return res
        .status(200)
        .json({ isSuccess: true, todoList, message: "success" });
    } catch (e) {
      console.log("e :", e);
      return res.json({ isSuccess: false, message: e.message });
    }
  }
);

router.post(
  API.POST_TODO(":id", ":date"),
  router.isAuthenticated,
  async (req, res, next) => {
    const user = req.user;

    const {
      body: { title, content },
      query: { date, id },
    } = req;

    try {
      const todo = await client.todo.create({
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
        },
      });
      res.status(200).json({ todo, message: "success" });
    } catch (e) {
      console.log(e);
      res.json({ message: "fail" });
    }
  }
);

export default router;
