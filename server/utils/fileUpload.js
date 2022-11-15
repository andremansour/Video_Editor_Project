const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString().replace(/:/g, "-") + "-"+file.originalname);
	},
});

// File format being saved

function fileFilter(req, file, cb) {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "video/mp4" || file.mimetype === "sound/mp3") {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

const upload = multer({ strorage: fileFilter });

module.exports = {
    upload,
};
