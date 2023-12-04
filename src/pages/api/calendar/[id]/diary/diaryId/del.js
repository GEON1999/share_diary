import router from "../../../../../../../libs/server/router";
import client from "../../../../../../../libs/server/client";

router.post("/api/calendar/:id/diary/:diaryId/del", async (req, res) => {
  console.log("rendered del api");

  const {
    query: { id, diaryId },
  } = req;

  try {
    const diary = await client.diary.delete({
      where: {
        id: Number(diaryId),
      },
    });
    console.log("diary", diary);
    res.json({ isSuccess: true, message: "일기가 삭제되었습니다." });
  } catch (e) {
    console.log(e);
    res.json({ isSuccess: false, message: "일기 삭제에 실패했습니다." });
  }
});

export default router;
