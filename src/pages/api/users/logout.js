import router from "../../../../libs/server/router";

router.post("/api/users/logout", async (req, res) => {
  req.logout();

  return res.json({ success: true, data: null });
});

export default router;
