import router from "../../../../../../../../libs/server/router";
import client from "../../../../../../../../libs/server/client";
import API from "@/API";

router.get(
  API.GET_DIARY_DETAIL(":id", ":diaryId"),
  router.isAuthenticated,
  async (req, res, next) => {
    const { id, diaryId } = req?.query;

    try {
      const diary = await client.diary.findUnique({
        where: {
          id: Number(diaryId),
        },
        include: {
          user: true,
        },
      });

      return res.json({ isSuccess: true, diary, message: "success" });
    } catch (e) {
      return res.json({
        isSuccess: false,
        message: "달력을 불러오는데 실패했습니다.",
      });
    }
  }
);

router.post(
  API.PUT_DIARY(":id", ":diaryId"),
  router.isAuthenticated,
  async (req, res) => {
    const {
      body: { title, content, img },
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
          img,
        },
      });

      res.json({ isSuccess: true, message: "일기가 수정되었습니다." });
    } catch (e) {
      console.log(e);
      res.json({ isSuccess: false, message: "일기 수정에 실패했습니다." });
    }
  }
);

export default router;
