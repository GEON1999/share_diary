import router from "../../../../libs/server/router";
import client from "../../../../libs/server/client";
import { console } from "next/dist/compiled/@edge-runtime/primitives/console";
import API from "@/API";

router.post(API.GET_INVITED_CALENDAR(), async (req, res) => {
  const {
    body: { code, userId },
    user,
  } = req;

  const findUser = await client.user.findFirst({
    where: {
      id: Number(user.id),
    },
  });

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
      await client.calendarPermission.create({
        data: {
          userId: Number(userId),
          calendarId: Number(inviteCode.calendarId),
        },
      });

      await client.calendarUserProfile.create({
        data: {
          userId: Number(userId),
          calendarId: Number(inviteCode.calendarId),
          name: findUser?.name ?? "",
          color: "",
        },
      });

      res.json({
        isSuccess: true,
        message: "초대코드가 성공적으로 등록되었습니다.",
      });
    } catch (e) {
      console.log("e :", e);
      res.json({ isSuccess: false, message: "초대코드 등록에 실패했습니다." });
    }
  } else {
    res.json({ isSuccess: false, message: "초대코드가 유효하지 않습니다." });
  }
});

export default router;
