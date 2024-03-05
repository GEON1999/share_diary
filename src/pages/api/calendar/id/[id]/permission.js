import router from "../../../../../../libs/server/router";
import client from "../../../../../../libs/server/client";
import API from "@/API";

router.get(
  API.GET_CALENDAR_PERMISSION(":id"),
  router.isAuthenticated,
  async (req, res) => {
    const { userId, id } = req.query;

    try {
      const permission = await client.calendarPermission.findFirst({
        where: {
          userId: Number(userId),
          calendarId: Number(id),
        },
        select: {
          role: true,
        },
      });

      if (!permission) {
        return res.json({ isSuccess: false, message: "권한이 없습니다." });
      }

      res.json({ isSuccess: true, permission });
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
