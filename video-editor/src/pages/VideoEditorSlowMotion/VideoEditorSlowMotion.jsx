import React, { useState, useEffect } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/helpers";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import VideoFilePicker from "../HelpersComps/VideoFilePicker";
import Output9x16Video from "../HelpersComps/Output9x16Video";

import { ffmpeg } from "../../App";

// const ffmpeg = createFFmpeg({
// 	corePath: "./ffmpeg_core_dist/ffmpeg-core.js", // Path to ffmpeg-core.js
// 	log: true,
// });

function VideoEditorSlowMotion() {
	useRedirectLoggedOutUser("/login");

	const [inputVideoFile, setInputVideoFile] = useState(null);

	const [videoMeta, setVideoMeta] = useState(null);

	const [outputVideoFile, setOutputVideoFile] = useState(null);
	const [videoURL, setvideoURL] = useState([]);

	const [isProcessing, setIsProcessing] = useState(false);

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

	//function takes a video file and mutes audio
	const slowMotion = async () => {
		console.log(inputVideoFile.name);
		setIsProcessing(true);

		ffmpeg.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));

		await ffmpeg.run("-i", inputVideoFile.name, "-r", "16", "-filter:v", "setpts=2.0*PTS", "-filter:a", "atempo=0.5","output.mp4");
		const data = ffmpeg.FS("readFile", "output.mp4");

		const dataURL = await helpers.readFileAsBase64(new Blob([data.buffer], { type: "video/mp4" }));

		setOutputVideoFile(dataURL);
		console.log(dataURL);
		setIsProcessing(false);

		return data;
	};

	return (
		<div className="app">
			<section className="deck">
				<article className="grid_txt_2">
					<h2>Slow Motion your video!</h2>
					<VideoFilePicker handleChange={handleVideoChange} showVideo={!!inputVideoFile}>
						<div className="bord_g_2 p_2">
							<video src={inputVideoFile ? videoURL : null} autoPlay controls muted onLoadedMetadata={handleVideoLoadedData} width="450"></video>
						</div>
					</VideoFilePicker>
					<div className="u-center">
						<button onClick={slowMotion} className="btn btn_b" disabled={isProcessing}>
							{isProcessing ? "processing..." : "combine"}
						</button>
					</div>
				</article>
				<Output9x16Video videoSrc={outputVideoFile} handleDownload={() => helpers.download(outputVideoFile)} />
			</section>
		</div>
	);
}

export default VideoEditorSlowMotion;
