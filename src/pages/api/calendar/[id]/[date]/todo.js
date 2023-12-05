import router from "../../../../../../libs/server/router";
import client from "../../../../../../libs/server/client";

router.get(`/api/calendar/:id/:date/todo`, async (req, res, next) => {
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

    return res.status(200).json({ isSuccess: true, todo, message: "success" });
  } catch (e) {
    console.log("e :", e);
    return res.json({ isSuccess: false, message: e.message });
  }
});

router.post(`/api/calendar/:id/:date/todo`, async (req, res, next) => {
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
});

/*router.get(`/api/calendar/:date/todo`, async (req, res, next) => {
  console.log(req.query, req.body);
});*/

export default router;
