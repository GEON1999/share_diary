import router from "../../../../../../../../libs/server/router";
import client from "../../../../../../../../libs/server/client";
import API from "@/API";

router.post(
  API.DELETE_DIARY(":id", ":diaryId"),
  router.isAuthenticated,
  router.isAuthenticated,
  async (req, res) => {
    const {
      query: { id, diaryId },
    } = req;

    try {
      const diary = await client.diary.delete({
        where: {
          id: Number(diaryId),
        },
      });
      res.json({ isSuccess: true, message: "일기가 삭제되었습니다." });
    } catch (e) {
      console.log(e);
      res.json({ isSuccess: false, message: "일기 삭제에 실패했습니다." });
    }
  }
);

export default router;
