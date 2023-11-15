import router from "../../../../../../../libs/server/router";
import client from "../../../../../../../libs/server/client";

router.get(`/api/calendar/:id/:date/diary/:diaryId`, async (req, res, next) => {
  const user = req.user;
  const { id, date, diaryId } = req?.query;
  console.log("query :", req.query);

  try {
    const diary = await client.diary.findUnique({
      where: {
        id: Number(diaryId),
      },
    });

    return res.status(200).json({ isSuccess: true, diary, message: "success" });
  } catch (e) {
    console.log("e :", e);
    return res.status(500).json({ isSuccess: false, message: e.message });
  }
});

export default router;
