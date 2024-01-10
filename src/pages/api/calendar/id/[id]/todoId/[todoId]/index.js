import router from "../../../../../../../../libs/server/router";
import client from "../../../../../../../../libs/server/client";
import API from "@/API";

router.get(
  API.GET_TODO_DETAIL(":id", ":todoId"),
  router.isAuthenticated,
  async (req, res, next) => {
    const { id, todoId } = req?.query;

    try {
      const todo = await client.todo.findUnique({
        where: {
          id: Number(todoId),
        },
        include: {
          user: true,
        },
      });

      return res.json({ isSuccess: true, todo, message: "success" });
    } catch (e) {
      return res.json({
        isSuccess: false,
        message: "달력을 불러오는데 실패했습니다.",
      });
    }
  }
);

router.post(API.PUT_TODO(":id", ":todoId"), async (req, res) => {
  const {
    body: { title, content },
    query: { id, todoId },
  } = req;

  try {
    const todo = await client.todo.update({
      where: {
        id: Number(todoId),
      },
      data: {
        title,
        content,
      },
    });

    res.json({ isSuccess: true, message: "할 일이 수정되었습니다." });
  } catch (e) {
    console.log(e);
    res.json({ isSuccess: false, message: "할 일 수정에 실패했습니다." });
  }
});

export default router;
