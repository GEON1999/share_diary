import router from "../../../../../../libs/server/router";
import client from "../../../../../../libs/server/client";
import API from "@/API";

router.get(
  API.GET_CALENDAR_PERMISSION_LIST(":id"),
  router.isAuthenticated,
  async (req, res) => {
    const { id } = req.query;

    try {
      const permissions = await client.calendarPermission.findMany({
        where: {
          calendarId: Number(id),
        },
        select: {
          role: true,
          user: true,
        },
      });

      if (!permissions) {
        return res.json({ isSuccess: false, message: "권한이 없습니다." });
      }

      res.json({ isSuccess: true, permissions });
    } catch (e) {
      console.log("e :", e);
      return res.json({
        isSuccess: false,
        message: "캘린더 프로필을 찾지 못했습니다.",
      });
    }
  }
);

export default router;
