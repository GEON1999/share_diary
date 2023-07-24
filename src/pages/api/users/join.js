import router from "../../../../libs/server/router";
import client from "../../../../libs/server/client";

router.post("/api/users/join", async (req, res, next) => {
  const { id, pw } = req?.body;
  console.log("joinId:", id, "pw:", pw);

  const user = await client.user.findFirst({
    where: {
      email: id,
    },
  });
  console.log("isUser?");

  if (user) {
    console.log("user:", user);
    return res
      .status(200)
      .json({ isSuccess: true, message: "already have an account", user });
  } else if (!user) {
    console.log("hi");
    const newUser = await client.user.create({
      data: {
        email: id,
        password: pw,
      },
    });
    console.log("newUser:", newUser);
    return res
      .status(200)
      .json({ isSuccess: true, message: "created", newUser });
  }
  console.log("failed");
  return res.status(500).json({ isSuccess: false, message: "fail" });
});

export default router;
