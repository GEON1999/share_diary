import router from "../../../../libs/server/router";
import client from "../../../../libs/server/client";

router.post("/api/calendar/invite", async (req, res) => {
  const {
    body: { code, userId },
  } = req;

  const inviteCode = await client.inviteCode.findFirst({
    where: {
      code,
    },
    include: {
      calendar: true,
    },
  });

  if (!inviteCode) {
    return res.json({
      isSuccess: false,
      message: "초대코드가 유효하지 않습니다.",
    });
  }

  const permission = await client.calendarPermission.findMany({
    where: {
      calendarId: Number(inviteCode.calendarId),
    },
  });

  if (permission) {
    const isExist = permission.find((item) => item.userId === Number(userId));
    if (isExist) {
      return res.json({
        isSuccess: false,
        message: "이미 등록된 초대코드입니다.",
      });
    }
    try {
      const newPermission = await client.calendarPermission.create({
        data: {
          userId: Number(userId),
        },
      });

      res.json({
        isSuccess: true,
        message: "초대코드가 성공적으로 등록되었습니다.",
      });
    } catch (e) {
      res.json({ isSuccess: false, message: "초대코드 등록에 실패했습니다." });
    }
  } else {
    res.json({ isSuccess: false, message: "초대코드 등록에 실패했습니다." });
  }
});

export default router;
