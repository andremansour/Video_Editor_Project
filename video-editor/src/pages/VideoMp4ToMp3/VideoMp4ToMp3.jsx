import React, { useState, useEffect } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/helpers";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import VideoFilePicker from "../HelpersComps/VideoFilePicker";
// import AudioFilePicker from "../HelpersComps/AudioFilePicker";
import OutputSound from "../HelpersComps/OutputSound";

import { ffmpeg } from "../../App";

// const ffmpeg = createFFmpeg({
// 	corePath: "./ffmpeg_core_dist/ffmpeg-core.js", // Path to ffmpeg-core.js
// 	log: true,
// });

function VideoEditorMp4ToMp3() {
	useRedirectLoggedOutUser("/login");

	const [inputVideoFile, setInputVideoFile] = useState(null);

	const [videoMeta, setVideoMeta] = useState(null);

	const [outputAudioFile, setOutputAudioFile] = useState(null);
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


	//function thaty converts mp4 to mp3
	const convertMp4toMp3 = async () => {
		console.log(inputVideoFile.name);
		setIsProcessing(true);

		ffmpeg.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));

		await ffmpeg.run("-i", inputVideoFile.name,"-q:a","0","-map","a","output.mp3");
		const data = ffmpeg.FS("readFile", "output.mp3");

		const dataURL = await helpers.readFileAsBase64(new Blob([data.buffer], { type: "audio/mpeg" }));

		setOutputAudioFile(dataURL);
		console.log(dataURL);
		setIsProcessing(false);

		return data;
	};



	return (
		<div className="app">
			<section className="deck">
				<article className="grid_txt_2">
					<h2>Convert your Mp4 to Mp3</h2>
					<VideoFilePicker handleChange={handleVideoChange} showVideo={!!inputVideoFile}>
						<div className="bord_g_2 p_2">
							<video src={inputVideoFile ? videoURL : null} autoPlay controls muted onLoadedMetadata={handleVideoLoadedData} width="450"></video>
						</div>
					</VideoFilePicker>
					<div className="u-center">
						<button onClick={convertMp4toMp3} className="btn btn_b" disabled={isProcessing}>
							{isProcessing ? "processing..." : "combine"}
						</button>
					</div>
				</article>
				<OutputSound soundSrc={outputAudioFile} handleDownload={() => helpers.download(outputAudioFile)} />
			</section>
		</div>
	);
}

export default VideoEditorMp4ToMp3;
