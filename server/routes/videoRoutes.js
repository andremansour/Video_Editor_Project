const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createVideo, getVideos, getVideo, deleteVideo } = require("../controllers/videoController.js");
const { upload } = require("../utils/fileUpload");


router.post("/", protect, upload.single("video"), createVideo);
router.get("/", protect, getVideos);
router.get("/:id", protect, getVideo);
router.delete("/:id", protect, deleteVideo);

module.exports = router;
