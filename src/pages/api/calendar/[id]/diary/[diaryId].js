import router from "../../../../../../libs/server/router";
import client from "../../../../../../libs/server/client";

router.get("/api/calendar/:id/diary/:diaryId", async (req, res, next) => {
  const { id, diaryId } = req?.query;
  console.log("qwe :", req.query);

  try {
    const diary = await client.diary.findUnique({
      where: {
        id: Number(diaryId),
      },
    });

    return res.json({ isSuccess: true, diary, message: "success" });
  } catch (e) {
    console.log("e :", e);
    return res.json({
      isSuccess: false,
      message: "달력을 불러오는데 실패했습니다.",
    });
  }
});

router.post("/api/calendar/:id/diary/:diaryId", async (req, res) => {
  const {
    body: { title, content },
    query: { id, diaryId },
  } = req;

  try {
    const diary = await client.diary.update({
      where: {
        id: Number(diaryId),
      },
      data: {
        title,
        content,
      },
    });
    console.log("diary", diary);

    res.json({ isSuccess: true, message: "일기가 수정되었습니다." });
  } catch (e) {
    console.log(e);
    res.json({ isSuccess: false, message: "일기 수정에 실패했습니다." });
  }
});

export default router;
