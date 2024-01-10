import router from "../../../../libs/server/router";
import client from "../../../../libs/server/client";

router.post("/api/users/join", async (req, res, next) => {
  const { id, pw, name } = req?.body;

  const user = await client.user.findFirst({
    where: {
      email: id,
    },
  });

  if (user) {
    return res
      .status(200)
      .json({ isSuccess: true, message: "중복된 아이디 입니다", user });
  } else if (!user) {
    const newUser = await client.user.create({
      data: {
        email: id,
        password: pw,
        name: name,
      },
    });
    return res
      .status(200)
      .json({ isSuccess: true, message: "created", newUser });
  }
  return res.status(500).json({ isSuccess: false, message: "fail" });
});

export default router;
