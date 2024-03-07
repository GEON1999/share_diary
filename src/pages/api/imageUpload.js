import router from "../../../libs/server/router";
import s3Multer from "../../../libs/server/s3Multer";
import upload from "../../../libs/server/s3Multer";
import API from "@/API";

export const config = {
  api: {
    bodyParser: false,
  },
};

router.post(API.POST_IMAGE(), s3Multer.single("file"), async (req, res) => {
  console.log("file :", req.file);
  return res.json({
    result: "success",
    error: false,
    key: req.file?.key,
    url: "https://s3.ap-northeast-2.amazonaws.com/geon.com/" + req.file?.key,
    data: "uploadData",
  });
});

export default router;
