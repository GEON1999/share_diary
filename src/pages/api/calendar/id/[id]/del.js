import router from "../../../../../../libs/server/router";
import API from "@/API";
import client from "../../../../../../libs/server/client";

router.post(API.DELETE_CALENDAR(":id"), async (req, res, next) => {
  const user = req.user;
  const { id, userId } = req?.query;

  const permission = await client.calendarPermission.findFirst({
    where: {
      userId: Number(user.id),
      calendarId: Number(id),
    },
  });

  if (permission.role !== "OWNER") {
    try {
      await client.calendarPermission.delete({
        where: {
          id: permission.id,
        },
      });

      await client.calendarUserProfile.deleteMany({
        where: {
          calendarId: Number(id),
        },
      });

      await client.diary.deleteMany({
        where: {
          calendarId: Number(id),
          userId: Number(user.id),
        },
      });

      await client.todo.deleteMany({
        where: {
          calendarId: Number(id),
          userId: Number(user.id),
        },
      });

      return res.status(200).json({ isSuccess: true, message: "success" });
    } catch (e) {
      console.log("e :", e);
      return res.json({ isSuccess: false, message: e.message });
    }
  } else if (permission.role === "OWNER") {
    try {
      await client.calendarPermission.delete({
        where: {
          id: permission.id,
        },
      });

      await client.calendarUserProfile.deleteMany({
        where: {
          calendarId: Number(id),
        },
      });

      await client.inviteCode.deleteMany({
        where: {
          calendarId: Number(id),
        },
      });

      await client.calendar.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({ isSuccess: true, message: "success" });
    } catch (e) {
      console.log("e :", e);
      return res.json({ isSuccess: false, message: e.message });
    }
  }
});

export default router;
