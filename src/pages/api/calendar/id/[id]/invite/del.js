import router from "../../../../../../../libs/server/router";
import client from "../../../../../../../libs/server/client";
import API from "@/API";

router.post(API.DELETE_CALENDAR_INVITE(":id"), async (req, res) => {
  const {
    query: { id },
  } = req;
  const { userId } = req.body;
  const calendar = await client.calendar.findUnique({
    where: {
      id: Number(id),
    },
  });

  const permission = await client.calendarPermission.findFirst({
    where: {
      calendarId: Number(id),
      userId: Number(userId),
    },
  });

  if (permission.role === "VIEWER") {
    return res.json({ message: "권한이 없습니다." });
  }

  try {
    const inviteCode = await client.inviteCode.delete({
      where: {
        calendarId: Number(id),
      },
    });
    return res.json({ isSuccess: true, inviteCode });
  } catch (e) {
    return res.json({
      isSuccess: false,
      message: "초대코드 삭제에 실패했습니다.",
    });
  }
});

export default router;
