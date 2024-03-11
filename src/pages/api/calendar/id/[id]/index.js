import client from "../../../../../../libs/server/client";
import router from "../../../../../../libs/server/router";
import API from "@/API";

router.get(
  API.GET_CALENDAR_DETAIL(":id"),
  router.isAuthenticated,
  async (req, res, next) => {
    const { id, userId } = req?.query;

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

      const calendarPermission = await client.calendarPermission.findFirst({
        where: {
          calendarId: Number(id),
          userId: Number(userId),
        },
      });
      if (!calendarPermission) {
        return res.json({ isSuccess: false, message: "권한이 없습니다." });
      }

      return res
        .status(200)
        .json({ isSuccess: true, calendar, message: "success" });
    } catch (e) {
      console.log("e :", e);
      return res.status(500).json({ isSuccess: false, message: e.message });
    }
  }
);

router.post(
  API.EDIT_CALENDAR_DETAIL(":id"),
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
);

export default router;
