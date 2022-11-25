import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/helpers";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import VideoFilePicker from "./VideoFilePicker";
import OutputVideo from "./OutputVideo";
import RangeInput from "./RangeInput";
import { ffmpeg } from "../../App";

function VideoEditorTrim() {
	useRedirectLoggedOutUser("/login");

	const [windowSize, setWindowSize] = useState(getWindowSize());
	let videoinnerwidth = windowSize.innerWidth;
	console.log(videoinnerwidth);

	if (videoinnerwidth <= 500) {
		videoinnerwidth = 300;
	} else {
		videoinnerwidth = 450;
	}

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	console.log(windowSize.innerWidth);

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

		let MAX_NUMBER_OF_IMAGES = null;
		let NUMBER_OF_IMAGES = null;

		console.log(windowSize.innerWidth);
		if (windowSize.innerWidth <= 500) {
			MAX_NUMBER_OF_IMAGES = 3;
			NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 3;
		} else {
			MAX_NUMBER_OF_IMAGES = 15;
			NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 15;
		}

		console.log(MAX_NUMBER_OF_IMAGES);
		console.log(NUMBER_OF_IMAGES);

		let offset = duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / NUMBER_OF_IMAGES;

		const arrayOfImageURIs = [];
		ffmpeg.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));

		for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
			let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));

			try {
				await ffmpeg.run("-ss", startTimeInSecs, "-i", inputVideoFile.name, "-t", "00:00:1.000", "-vf", `scale=300:-1`, `img${i}.png`);
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
			{/* <section className="deck">
				<article className="grid_txt_2">
					<h2>Trim Your Video</h2>
					<VideoFilePicker handleChange={handleChange} showVideo={!!inputVideoFile}>
						<div className="bord_g_2 p_2">
							<video src={inputVideoFile ? URL : null} autoPlay controls muted onLoadedMetadata={handleLoadedData} width="450"></video>
						</div>
					</VideoFilePicker>
				</article>
				<OutputVideo videoSrc={trimmedVideoFile} handleDownload={() => helpers.download(trimmedVideoFile)} />
			</section> */}
			<section>
				<div className="container">
					<h1>Trim your video</h1>
					<div className="row">
						<div className="col-md-12 col-lg-6">
							<article className="grid_txt_2">
								<VideoFilePicker handleChange={handleChange} showVideo={!!inputVideoFile}>
									<video src={inputVideoFile ? URL : null} autoPlay controls muted onLoadedMetadata={handleLoadedData} width={videoinnerwidth}></video>
								</VideoFilePicker>
							</article>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
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
						<div className="col-md-12">
							<OutputVideo videoSrc={trimmedVideoFile} handleDownload={() => helpers.download(trimmedVideoFile)} width={videoinnerwidth}></OutputVideo>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default VideoEditorTrim;
