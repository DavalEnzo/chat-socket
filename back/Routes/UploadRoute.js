const upload = require("../Middlewares/UploadMiddleware");
const router = require("express").Router();

router.post("/", upload.single("image"), (req, res) => {
  res.status(200).json({
    message: "Image téléchargée avec succès",
  });
});

module.exports = router;