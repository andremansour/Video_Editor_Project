import React, { useState, useEffect } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/helpers";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import VideoFilePicker from "../HelpersComps/VideoFilePicker";
import OutputGif from "../HelpersComps/OutputGif";

import { ffmpeg } from "../../App";

// (async function () {
//     await ffmpeg.load();
// })();

function VideoEditorVideoToGif() {
	useRedirectLoggedOutUser("/login");

	const [inputVideoFile, setInputVideoFile] = useState(null);

	const [videoMeta, setVideoMeta] = useState(null);

	const [outputGifFile, setOutputGifFile] = useState(null);
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

	const createGif = async () => {
		setIsProcessing(true);
		ffmpeg.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));

		await ffmpeg.run("-i", inputVideoFile.name, "-t", "5", "-ss", "00:00:00", "-f", "gif", "output.gif");
		const data = ffmpeg.FS("readFile", "output.gif");
		console.log(data);

		const dataURL = await helpers.readFileAsBase64(new Blob([data.buffer], { type: "image/gif" }));

		setOutputGifFile(dataURL);

		setIsProcessing(false);

		return data;
	};

	return (
		<div className="app">
			<section className="deck">
				<article className="grid_txt_2">
					<h2>Select a video to convert to a Gif!</h2>
					<VideoFilePicker handleChange={handleVideoChange} showVideo={!!inputVideoFile}>
						<div className="bord_g_2 p_2">
							<video src={inputVideoFile ? videoURL : null} autoPlay controls muted onLoadedMetadata={handleVideoLoadedData} width="450"></video>
						</div>
					</VideoFilePicker>
					<div className="u-center">
						<button onClick={createGif} className="btn btn_b" disabled={isProcessing}>
							{isProcessing ? "processing..." : "combine"}
						</button>
					</div>
				</article>
				<article className="grid_txt_2">
					<h2>Output Gif</h2>
					<div className="bord_g_2 p_2">
						<OutputGif gifSrc={outputGifFile} handleDownload={() => helpers.download(outputGifFile)} />
					</div>
				</article>
			</section>
		</div>
	);
}

export default VideoEditorVideoToGif;
