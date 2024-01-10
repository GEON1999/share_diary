import router from "../../../../../../../libs/server/router";
import client from "../../../../../../../libs/server/client";
import API from "@/API";

router.get(
  API.GET_CALENDAR_INVITE_CODE(":id"),
  router.isAuthenticated,
  async (req, res) => {
    const {
      query: { id },
    } = req;

    try {
      const inviteCode = await client.inviteCode.findFirst({
        where: {
          calendarId: Number(id),
        },
      });
      return res.json({ isSuccess: true, inviteCode });
    } catch (e) {
      return res.json({ isSuccess: false, message: "초대코드가 없습니다." });
    }
  }
);

router.post(
  API.CREATE_CALENDAR_INVITE(":id"),
  router.isAuthenticated,
  async (req, res) => {
    const {
      query: { id },
    } = req;
    const { userId } = req.body;

    const permission = await client.calendarPermission.findFirst({
      where: {
        calendarId: Number(id),
        userId: Number(userId),
      },
    });

    if (permission.role === "VIEWER") {
      return res.json({ message: "권한이 없습니다." });
    }
    const inviteCode = await client.inviteCode.findFirst({
      where: {
        calendarId: Number(id),
      },
    });

    if (inviteCode) {
      return res.json({
        isSuccess: false,
        message: "이미 초대코드가 있습니다. 삭제 후 다시 시도해주세요.",
      });
    }

    try {
      const inviteCode = await client.inviteCode.create({
        data: {
          calendarId: Number(id),
          code: Math.random().toString(36).substr(2, 11),
        },
      });
      return res.json({ isSuccess: true, inviteCode });
    } catch (e) {
      return res.json({
        isSuccess: false,
        message: "초대코드 생성에 실패했습니다.",
      });
    }
  }
);

export default router;
