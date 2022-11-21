import React, { useState, useEffect } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/helpers";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import VideoFilePicker from "./VideoFilePicker";
import OutputVideo from "./OutVideo";
import RangeInput from "./RangeInput";
import { ffmpeg } from "../../App";

// const ffmpeg = createFFmpeg({
// 	corePath: "./ffmpeg_core_dist/ffmpeg-core.js", // Path to ffmpeg-core.js
// 	log: true,
// });

// (async function () {
// 	await ffmpeg.load();
// })();

function VideoEditorTrim() {
	useRedirectLoggedOutUser("/login");

	// const [videoSrc, setVideoSrc] = useState("");
	// const [videoSrc2, setVideoSrc2] = useState("");
	// const [gifSrc, setGifSrc] = useState("");

	// Uploading Video
	// const [imageFile, setImageFile] = useState({});
	// const [soundFile, setSoundFile] = useState({});
	// const [videoFile, setVideoFile] = useState({});
	// const [isProcessing, setIsProcessing] = useState(false);

	// const handleChangeImage = (e) => {
	// 	const image = e.target.files[0];
	// 	console.log(image);
	// 	setImageFile(image);
	// };

	// const handleChangeSound = (e) => {
	// 	const sound = e.target.files[0];
	// 	console.log(sound);
	// 	setSoundFile(sound);
	// };

	// const handleChangeVideo = (e) => {
	// 	const video = e.target.files[0];
	// 	console.log(video);
	// 	setVideoFile(video);
	// };

	// const createVideo = async () => {
	// 	await ffmpeg.load();
	// 	ffmpeg.FS("writeFile", "image.png", await fetchFile(imageFile));
	// 	ffmpeg.FS("writeFile", "sound.mp3", await fetchFile(soundFile));

	// 	await ffmpeg.run("-framerate", "1/10", "-i", "image.png", "-i", "sound.mp3", "-c:v", "libx264", "-t", "1000", "-pix_fmt", "yuv420p", "-vf", "scale=1920:1080", "test.mp4");
	// 	const data = ffmpeg.FS("readFile", "test.mp4");
	// 	setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })));
	// 	console.log(data);
	// 	return data;
	// };

	// function that returns thumbnail from video
	// const createThumbnail = async () => {
	//   await ffmpeg.load();
	//   ffmpeg.FS("writeFile", "video.mp4", await fetchFile(videoFile));

	//   await ffmpeg.run("-i", "video.mp4", "-ss", "00:00:01.000", "-vframes", "1", "thumbnail.png");
	//   const data = ffmpeg.FS("readFile", "thumbnail.png");
	//   setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: "image/png" })));
	//   return data;
	// };



	// create a function that takes two photos and creates a gif

	// const createGif = async () => {
	//   await ffmpeg.load();
	//   ffmpeg.FS("writeFile", "image1.png", await fetchFile(imageFile));
	//   ffmpeg.FS("writeFile", "image2.png", await fetchFile(imageFile2));

	//   await ffmpeg.run("-i", "image1.png", "-i", "image2.png", "-filter_complex", "hstack", "output.gif");
	//   const data = ffmpeg.FS("readFile", "output.gif");
	//   setGifSrc(URL.createObjectURL(new Blob([data.buffer], { type: "image/gif" })));
	//   return data;
	// };

	// create a function that trims a video and creates a new video file

	const [inputVideoFile, setInputVideoFile] = useState(null);
	const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
	const [videoMeta, setVideoMeta] = useState(null);
	const [URL, setURL] = useState([]);
	const [trimIsProcessing, setTrimIsProcessing] = useState(false);

	const [rStart, setRstart] = useState(0);
	const [rEnd, setRend] = useState(10);
	const [thumbNails, setThumbNails] = useState([]);
	const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);

	const handleChange = async (e) => {
		let file = e.target.files[0];
		console.log(file);
		setInputVideoFile(file);

		setURL(await helpers.readFileAsBase64(file));
	};

	const handleLoadedData = async (e) => {
		const el = e.target;
		const meta = {
			name: inputVideoFile.name,
			duration: el.duration,
			videoWidth: el.videoWidth,
			videoHeight: el.videoHeight,
		};
		console.log({ meta });
		setVideoMeta(meta);
		const thumbNails = await getThumbnails(meta);
		setThumbNails(thumbNails);
	};

	const getThumbnails = async ({ duration }) => {
		if (!ffmpeg.isLoaded()) await ffmpeg.load();
		setThumbnailIsProcessing(true);
		let MAX_NUMBER_OF_IMAGES = 15;
		let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 15;
		let offset = duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / NUMBER_OF_IMAGES;

		const arrayOfImageURIs = [];
		ffmpeg.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));

		for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
			let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));

			try {
				await ffmpeg.run("-ss", startTimeInSecs, "-i", inputVideoFile.name, "-t", "00:00:1.000", "-vf", `scale=150:-1`, `img${i}.png`);
				const data = ffmpeg.FS("readFile", `img${i}.png`);

				let blob = new Blob([data.buffer], { type: "image/png" });
				let dataURI = await helpers.readFileAsBase64(blob);
				ffmpeg.FS("unlink", `img${i}.png`);
				arrayOfImageURIs.push(dataURI);
			} catch (error) {
				console.log({ message: error });
			}
		}
		setThumbnailIsProcessing(false);

		return arrayOfImageURIs;
	};

	const handleTrim = async () => {
		setTrimIsProcessing(true);

		let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
		let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
		console.log(startTime, offset, helpers.toTimeString(startTime), helpers.toTimeString(offset));

		try {
			ffmpeg.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
			// await ffmpeg.run('-ss', '00:00:13.000', '-i', inputVideoFile.name, '-t', '00:00:5.000', 'ping.mp4');
			await ffmpeg.run("-ss", helpers.toTimeString(startTime), "-i", inputVideoFile.name, "-t", helpers.toTimeString(offset), "-c", "copy", "ping.mp4");

			const data = ffmpeg.FS("readFile", "ping.mp4");
			console.log(data);
			const dataURL = await helpers.readFileAsBase64(new Blob([data.buffer], { type: "video/mp4" }));

			setTrimmedVideoFile(dataURL);
		} catch (error) {
			console.log(error);
		} finally {
			setTrimIsProcessing(false);
		}
	};

	const handleUpdateRange = (func) => {
		return ({ target: { value } }) => {
			func(value);
		};
	};

	return (
		<div className="app">
			<section className="deck">
				<article className="grid_txt_2">
					<VideoFilePicker handleChange={handleChange} showVideo={!!inputVideoFile}>
						<div className="bord_g_2 p_2">
							<video src={inputVideoFile ? URL : null} autoPlay controls muted onLoadedMetadata={handleLoadedData} width="450"></video>
						</div>
					</VideoFilePicker>
				</article>
				<OutputVideo videoSrc={trimmedVideoFile} handleDownload={() => helpers.download(trimmedVideoFile)} />
			</section>
			{
				<>
					<RangeInput
						rEnd={rEnd}
						rStart={rStart}
						handleUpdaterStart={handleUpdateRange(setRstart)}
						handleUpdaterEnd={handleUpdateRange(setRend)}
						loading={thumbnailIsProcessing}
						videoMeta={videoMeta}
						control={
							<div className="u-center">
								<button onClick={handleTrim} className="btn btn_b" disabled={trimIsProcessing}>
									{trimIsProcessing ? "trimming..." : "trim selected"}
								</button>
							</div>
						}
						thumbNails={thumbNails}
					/>
				</>
			}
		</div>
	);
}

export default VideoEditorTrim;
