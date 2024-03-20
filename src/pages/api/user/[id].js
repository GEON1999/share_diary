import API from "@/API";
import router from "../../../../libs/server/router";
import client from "../../../../libs/server/client";

router.get(
  API.GET_USER(":id"),
  router.isAuthenticated,
  async (req, res, next) => {
    const { id, userId } = req?.query;

    try {
      const user = await client.user.findFirst({
        where: {
          id: Number(id),
        },
      });

      return res
        .status(200)
        .json({ isSuccess: true, user, message: "success" });
    } catch (e) {
      console.log("e :", e);
      return res.status(500).json({ isSuccess: false, message: e.message });
    }
  }
);

router.post(
  API.EDIT_USER(":id"),
  router.isAuthenticated,
  async (req, res, next) => {
    const {
      body: { name, img },
      query: { id },
    } = req;

    console.log("body :", req.body, "hi");

    try {
      const calendar = await client.calendar.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          img,
        },
      });

      return res.status(200).json({ isSuccess: true, calendar });
    } catch (e) {
      return res.json({ isSuccess: false, message: e.message });
    }
  }
);

export default router;
