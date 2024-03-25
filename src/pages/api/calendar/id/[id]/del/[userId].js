import router from "../../../../../../../libs/server/router";
import API from "@/API";
import client from "../../../../../../../libs/server/client";

router.post(
  API.DEL_USER(":id", ":userId"),
  router.isAuthenticated,
  async (req, res, next) => {
    const { id, userId } = req?.query;

    try {
      const permission = await client.calendarPermission.findFirst({
        where: {
          userId: Number(userId),
          calendarId: Number(id),
        },
      });

      await client.calendarPermission.delete({
        where: {
          id: permission.id,
        },
      });

      return res.status(200).json({ isSuccess: true, message: "success" });
    } catch (e) {
      console.log("e :", e);
      return res.json({ isSuccess: false, message: e.message });
    }
  }
);

export default router;
