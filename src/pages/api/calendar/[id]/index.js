import client from "../../../../../libs/server/client";
import router from "../../../../../libs/server/router";

router.get(`/api/calendar/:id`, async (req, res, next) => {
  const user = req.user;
  const { id, userId, date } = req?.query;
  console.log("query :", req.query);

  try {
    const calendar = await client.calendar.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        todos: true,
        diaries: true,
      },
    });

    return res
      .status(200)
      .json({ isSuccess: true, calendar, message: "success" });
  } catch (e) {
    console.log("e :", e);
    return res.status(500).json({ isSuccess: false, message: e.message });
  }
});

export default router;
