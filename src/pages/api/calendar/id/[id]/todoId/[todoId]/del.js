import router from "../../../../../../../../libs/server/router";
import client from "../../../../../../../../libs/server/client";
import API from "@/API";

router.post(
  API.DELETE_TODO(":id", ":todoId"),
  router.isAuthenticated,
  async (req, res) => {
    const {
      query: { id, todoId },
    } = req;

    try {
      await client.todo.delete({
        where: {
          id: Number(todoId),
        },
      });
      res.json({ isSuccess: true, message: "할 일이 삭제되었습니다." });
    } catch (e) {
      console.log(e);
      res.json({ isSuccess: false, message: "할 일 삭제에 실패했습니다." });
    }
  }
);

export default router;
