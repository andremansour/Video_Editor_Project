import React, { useState, useEffect } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/helpers";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import VideoFilePicker from "../HelpersComps/VideoFilePicker";
import AudioFilePicker from "../HelpersComps/AudioFilePicker";
import OutputVideo from "../HelpersComps/OutputVideo";

import { ffmpeg } from "../../App";

// const ffmpeg = createFFmpeg({
// 	corePath: "./ffmpeg_core_dist/ffmpeg-core.js", // Path to ffmpeg-core.js
// 	log: true,
// });

function VideoEditorCombine() {
	useRedirectLoggedOutUser("/login");

	const [inputVideoFile, setInputVideoFile] = useState(null);
	const [inputAudioFile, setInputAudioFile] = useState(null);

	const [videoMeta, setVideoMeta] = useState(null);
	const [audioMeta, setAudioMeta] = useState(null);

	const [outputVideoFile, setOutputVideoFile] = useState(null);
	const [videoURL, setvideoURL] = useState([]);
	const [audioURL, setaudioURL] = useState([]);

	const [isProcessing, setIsProcessing] = useState(false);

	const handleVideoChange = async (e) => {
		let videoFile = e.target.files[0];
		console.log(videoFile);
		setInputVideoFile(videoFile);

		setvideoURL(await helpers.readFileAsBase64(videoFile));
	};

	const handleAudioChange = async (e) => {
		let audioFile = e.target.files[0];
		console.log(audioFile);
		setInputAudioFile(audioFile);

		setaudioURL(await helpers.readFileAsBase64(audioFile));
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

	const handleAudioLoadedData = async (e) => {
		const el = e.target;
		const meta_audio = {
			name: inputAudioFile.name,
			duration: el.duration,
		};
		console.log({ meta_audio });
		setAudioMeta(meta_audio);
	};

	const audioName = audioMeta?.name;

	// function that takes video and sound and creates video with sound
	const createVideo = async () => {
		setIsProcessing(true);
		ffmpeg.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
		ffmpeg.FS("writeFile", inputAudioFile.name, await fetchFile(inputAudioFile));

		await ffmpeg.run("-stream_loop", "-1", "-i", inputVideoFile.name, "-i", inputAudioFile.name, "-c:v", "copy", "-c:a", "aac", "-strict", "experimental", "-map", "0:v:0", "-map", "1:a:0", "-shortest", "output.mp4");
		const data = ffmpeg.FS("readFile", "output.mp4");
		console.log(data);

		const dataURL = await helpers.readFileAsBase64(new Blob([data.buffer], { type: "video/mp4" }));

		setOutputVideoFile(dataURL);

		setIsProcessing(false);
		return data;
	};

	return (
		<div className="app">
			<section className="deck">
				<article className="grid_txt_2">
					<h2>Combine Video and Audio</h2>
					<VideoFilePicker handleChange={handleVideoChange} showVideo={!!inputVideoFile}>
						<div className="bord_g_2 p_2">
							<video src={inputVideoFile ? videoURL : null} autoPlay controls muted onLoadedMetadata={handleVideoLoadedData} width="450"></video>
						</div>
					</VideoFilePicker>
					<AudioFilePicker handleAudioChange={handleAudioChange} showAudio={!!inputAudioFile}>
						<div className="bord_g_2 p_2">
							<p>{audioName}</p>
							<audio src={inputAudioFile ? audioURL : null} onLoadedMetadata={handleAudioLoadedData}></audio>
						</div>
					</AudioFilePicker>
					<div className="u-center">
						<button onClick={createVideo} className="btn btn_b" disabled={isProcessing}>
							{isProcessing ? "processing..." : "combine"}
						</button>
					</div>
				</article>
				<OutputVideo videoSrc={outputVideoFile} handleDownload={() => helpers.download(outputVideoFile)} />
			</section>
		</div>
	);
}

export default VideoEditorCombine;
