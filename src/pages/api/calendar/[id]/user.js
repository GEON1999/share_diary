import router from "../../../../../libs/server/router";
import client from "../../../../../libs/server/client";

router.get("/api/calendar/:id/user", async (req, res) => {
  const { userId, id } = req.query;

  const calendar = await client.calendar.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!calendar) {
    return res.json({ isSuccess: false, message: "캘린더를 찾지 못했습니다." });
  }

  try {
    const userProfile = await client.calendarUserProfile.findFirst({
      where: {
        userId: Number(userId),
        calendarId: Number(id),
      },
    });

    res.json({ isSuccess: true, userProfile, calendar });
  } catch (e) {
    console.log("e :", e);
    return res.json({
      isSuccess: false,
      message: "캘린더 프로필을 찾지 못했습니다.",
    });
  }
});

router.post(`/api/calendar/:id/user`, async (req, res, next) => {
  const {
    user: { id: userId },
    query: { id },
    body: { color, name },
  } = req;

  if (!name) {
    return res.json({ isSuccess: false, message: "이름을 입력해주세요." });
  }

  try {
    const userProfile = await client.calendarUserProfile.findFirst({
      where: {
        userId: Number(userId),
        calendarId: Number(id),
      },
    });

    await client.calendarUserProfile.update({
      where: {
        id: userProfile.id,
      },
      data: {
        name: String(name),
      },
    });

    return res.json({ isSuccess: true, message: "success" });
  } catch (e) {
    return res.json({
      isSuccess: false,
      message: "프로필 수정에 실패했습니다.",
    });
  }
});

export default router;
