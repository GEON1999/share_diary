import router from "../../../../libs/server/router";

router.get("/api/users/me", async (req, res) => {
  console.log("hi user");
  const user = req?.user;
  console.log("user :", user);

  if (user) {
    return res.status(200).json({ success: true, user: user });
  } else {
    return await res.json({
      success: false,
      result: "server error",
      error: true,
    });
  }
});

export default router;
