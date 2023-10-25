import router from "../../../../libs/server/router";

router.get("/api/users/me", async (req, res) => {
  console.log("hi user");
  const user = req?.user;
  console.log("user :", user);

  if (user.username) {
    return res.status(200).json({ success: true, user: user.username });
  } else {
    return await res.json({
      success: false,
      result: "server error",
      error: true,
    });
  }
});

export default router;
