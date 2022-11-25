const asyncHandler = require("express-async-handler");
const Video = require("../models/videosModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createVideo = asyncHandler(async (req, res) => {
	const { name } = req.body;

	if (!name) {
		res.status(400);
		throw new Error("Please fill in all fields");
	}

	let fileData = {};

	if (req.file) {
		let uploadedFile;

		try {
			uploadedFile = await cloudinary.uploader.upload(req.file.path, { folder: "Video Editor App", resource_type: "video" });
		} catch (error) {
			res.status(500);
			throw new Error("Video could not be uploaded");
		}

		fileData = {
			fileName: req.file.filename,
			filePath: uploadedFile.secure_url,
			fileType: req.file.mimetype,
			fileSize: fileSizeFormatter(req.file.size, 2),
		};
	}

	const videos = await Video.create({
		user: req.user._id,
		name,
		video: fileData,
	});

	res.status(201).json(videos);
});

const getVideos = asyncHandler(async (req, res) => {
	const videos = await Video.find({ user: req.user._id }).sort({ createdAt: -1 });
	res.status(200).json(videos);
});

const getVideo = asyncHandler(async (req, res) => {
	const video = await Video.findById(req.params.id);

	if (!video) {
		res.status(404);
		throw new Error("Video not found");
	}

	if (video.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("You are not authorized to view this video");
	}

	res.status(200).json(video);
});

const deleteVideo = asyncHandler(async (req, res) => {
	const video = await Video.findById(req.params.id);

	if (!video) {
		res.status(404);
		throw new Error("Video not found");
	}

	if (video.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("You are not authorized to delete this video");
	}

	await video.remove();

	res.status(200).json({ message: "Video deleted successfully" });
});

module.exports = {
	createVideo,
	getVideos,
	getVideo,
    deleteVideo
};
