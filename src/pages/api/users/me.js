import router from "../../../../libs/server/router";

router.get("/api/users/me", router.isAuthenticated, async (req, res) => {
  const user = req?.user;

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
