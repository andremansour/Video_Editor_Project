import React, { useState, useEffect } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/helpers";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import VideoFilePicker from "../HelpersComps/VideoFilePicker";
import OutputVideo from "../HelpersComps/OutputVideo";
import { useDispatch, useSelector } from "react-redux";
import { createVideo, videoIsLoading } from "../../redux/features/video/videoSlice";
import { LoaderGif } from "../../components/loader/loader";

import { ffmpeg } from "../../App";
import { Navigate, useNavigate } from "react-router-dom";

const initialState = {
	name: "",
};

function VideoEditorCropVideo() {
	useRedirectLoggedOutUser("/login");

	const [inputVideoFile, setInputVideoFile] = useState(null);
	const [video, setVideo] = useState(initialState);

	const [videoMeta, setVideoMeta] = useState(null);
	const [audioMeta, setAudioMeta] = useState(null);

	const [outputVideoFile, setOutputVideoFile] = useState(null);
	const [videoURL, setvideoURL] = useState([]);

	const [isProcessing, setIsProcessing] = useState(false);

	const isLoading = useSelector(videoIsLoading);

	// const { name } = video;

	// const handleInputChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setVideo({ ...video, [name]: value });
	// };

	const handleVideoChange = async (e) => {
		let videoFile = e.target.files[0];
		console.log(videoFile);
		setInputVideoFile(videoFile);

		setvideoURL(await helpers.readFileAsBase64(videoFile));
	};

	const handleVideoLoadedData = async (e) => {
		const el = e.target;
		const meta_video = {
			name: inputVideoFile.name,
			duration: el.duration,
			videoWidth: el.videoWidth,
			videoHeight: el.videoHeight,
		};
		console.log({ meta_video });
		setVideoMeta(meta_video);
	};

	// function that takes video and sound and creates video with sound
	const cropVideo = async () => {
		setIsProcessing(true);
		ffmpeg.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));

		await ffmpeg.run("-i", inputVideoFile.name, "-filter_complex", "[0:v]boxblur=40,scale=1080x1920,setsar=1[bg];[0:v]scale=1080:1920:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=y=(H-h)/2", "-c:a", "copy", "output.mp4");
		const data = ffmpeg.FS("readFile", "output.mp4");
		console.log(data);

		const dataURL = await helpers.readFileAsBase64(new Blob([data.buffer], { type: "video/mp4" }));

		setOutputVideoFile(dataURL);

		setIsProcessing(false);
		return data;
	};

	const handleOutputVideoChange = async (e) => {
		const data = await cropVideo();
		let videoFile = data;
		console.log(videoFile);
		setOutputVideoFile(videoFile);
	};

	// const saveVideo = async (e) => {
	// 	e.preventDefault();
	// 	const data = await cropVideo();
	// 	const videoData = new FormData();
	// 	videoData.append("name", name);
	// 	videoData.append("video", data);

	// 	console.log(...videoData);

	// 	await useDispatch(createVideo(videoData));

	// 	useNavigate("/myvideos");
	// };

	return (
		<div className="app">
			{isLoading && <LoaderGif />}
			<section className="deck">
				<article className="grid_txt_2">
					<h2>Crop your video to 9:16</h2>
					<VideoFilePicker handleChange={handleVideoChange} showVideo={!!inputVideoFile}>
						<div className="bord_g_2 p_2">
							<video src={inputVideoFile ? videoURL : null} autoPlay controls muted onLoadedMetadata={handleVideoLoadedData} width="450"></video>
						</div>
					</VideoFilePicker>
					<div className="u-center">
						<button onClick={cropVideo} className="btn btn_b" disabled={isProcessing}>
							{isProcessing ? "processing..." : "combine"}
						</button>
					</div>
				</article>
				<OutputVideo videoSrc={outputVideoFile} handleDownload={() => helpers.download(outputVideoFile)} />
			</section>
		</div>
	);
}

export default VideoEditorCropVideo;
