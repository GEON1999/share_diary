import router from "../../../../libs/server/router";
import client from "../../../../libs/server/client";
import helper from "@/helper";
import bcrypt from "bcrypt";

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
    await bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log("hash_err :", err);
        return res.json({ isSuccess: false, message: "fail" });
      }
      bcrypt.hash(pw, salt, async (err, hash) => {
        const newUser = await client.user.create({
          data: {
            email: id,
            password: hash,
            name: name,
          },
        });
        return res
          .status(200)
          .json({ isSuccess: true, message: "created", newUser });
      });
    });
  }
  return res.status(500).json({ isSuccess: false, message: "fail" });
});

export default router;
