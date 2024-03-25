import router from "../../../libs/server/router";
import API from "@/API";
import client from "../../../libs/server/client";

router.get(
  API.GET_CALENDAR_SELECT_LIST(),
  router.isAuthenticated,
  async (req, res, next) => {
    const { userId } = req.query;

    try {
      const permission = await client.calendarPermission.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          calendar: {
            include: {
              todos: true,
            },
          },
        },
      });

      return res.status(200).json({
        isSuccess: true,
        calendars: permission,
        message: "success",
      });
    } catch (e) {
      return res.status(500).json({ isSuccess: false, message: e.message });
    }
  }
);

export default router;
