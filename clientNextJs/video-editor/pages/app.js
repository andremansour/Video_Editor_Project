import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

// import path from "clientNextJs/video-editor/node_modules/@ffmpeg/core/dist/ffmpeg-core.js"

import React from "react";

export default function App() {
	const [videoSrc, setVideoSrc] = useState("");
  const [videoSrc2, setVideoSrc2] = useState("");
	const [gifSrc, setGifSrc] = useState("");

	// Uploading Video
	const [imageFile, setImageFile] = useState({});
	const [soundFile, setSoundFile] = useState({});
	const [videoFile, setVideoFile] = useState({});
	const [isProcessing, setIsProcessing] = useState(false);

	const ffmpeg = createFFmpeg({
		corePath: "./ffmpeg_core_dist/ffmpeg-core.js", // Path to ffmpeg-core.js
		log: true,
	});

	const handleChangeImage = (e) => {
		const image = e.target.files[0];
		console.log(image);
		setImageFile(image);
	};

	const handleChangeSound = (e) => {
		const sound = e.target.files[0];
		console.log(sound);
		setSoundFile(sound);
	};

	const handleChangeVideo = (e) => {
		const video = e.target.files[0];
		console.log(video);
		setVideoFile(video);
	};

	/*
	 * Create simple 10 second video with image and sound
	 */
	const createVideo = async () => {
		await ffmpeg.load();
		ffmpeg.FS("writeFile", "image.png", await fetchFile(imageFile));
		ffmpeg.FS("writeFile", "sound.mp3", await fetchFile(soundFile));

		await ffmpeg.run("-framerate", "1/10", "-i", "image.png", "-i", "sound.mp3", "-c:v", "libx264", "-t", "1000", "-pix_fmt", "yuv420p", "-vf", "scale=1920:1080", "test.mp4");
		const data = ffmpeg.FS("readFile", "test.mp4");
		setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })));
	};

	/*
	 * Converts file to gif
	 * @param {File} file
	 * @returns {File} gifFile
	 */
	const convertToGif = async () => {
		// set the state to processing
		setIsProcessing(true);
		// create a new ffmpeg instance
		const ffmpeg = createFFmpeg({ log: true });
		// load the ffmpeg instance
		await ffmpeg.load();
		// write the video file to memory
		ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));
		// run the ffmpeg command
		await ffmpeg.run("-i", "test.mp4", "-t", "2.5", "-ss", "2.0", "-f", "gif", "scale=1280:720", "out.gif");
		// read the result
		const data = ffmpeg.FS("readFile", "out.gif");
		// create a URL
		const url = URL.createObjectURL(new Blob([data.buffer], { type: "image/gif" }));
		// set the gif file state
		setGifSrc(url);
		// set the state to not processing
		setIsProcessing(false);

		console.log(url);
	};

  /*
    * Combines two videos
    * @param {File} file
    * @returns {File} video
  */
  const combineVideos = async () => {
    // set the state to processing
    setIsProcessing(true);
    // create a new ffmpeg instance
    const ffmpeg = createFFmpeg({ log: true });
    // load the ffmpeg instance
    await ffmpeg.load();
    // write the video file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));
    ffmpeg.FS("writeFile", "test2.mp4", await fetchFile(videoFile2));
    // run the ffmpeg command
    await ffmpeg.run("-i", "test.mp4", "-i", "test2.mp4", "-filter_complex", "[0:v] [0:a] [1:v] [1:a] concat=n=2:v=1:a=1 [v] [a]", "-map", "[v]", "-map", "[a]", "output.mp4");
    // read the result
    const data = ffmpeg.FS("readFile", "output.mp4");
    // create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));

    setVideoSrc(url);
    // set the state to not processing
    setIsProcessing(false);
  }


  // create a function that takes audio from a video and converts the audio to subtitles on top of the video.

  const convertAudioToSubtitles = async () => {
    // set the state to processing
    setIsProcessing(true);
    // create a new ffmpeg instance
    const ffmpeg = createFFmpeg({ log: true });
    // load the ffmpeg instance
    await ffmpeg.load();
    // write the video file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));
    // run the ffmpeg command
    await ffmpeg.run("-i", "test.mp4", "-vf", "subtitles=test.srt", "scale=1920:1080", "output.mp4");
    // read the result
    const data = ffmpeg.FS("readFile", "output.mp4");
    // create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));

    setVideoSrc(url);
    // set the state to not processing
    setIsProcessing(false);
  }

  // create a function that allows the end user to trim a video at a time frame they choose.

  const trimVideo = async () => {
    // set the state to processing
    setIsProcessing(true);
    // create a new ffmpeg instance
    const ffmpeg = createFFmpeg({ log: true });
    // load the ffmpeg instance
    await ffmpeg.load();
    // write the video file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));
    // run the ffmpeg command
    await ffmpeg.run("-i", "test.mp4", "-ss", "00:00:00", "-to", "00:00:10", "-c", "copy", "output.mp4");
    // read the result
    const data = ffmpeg.FS("readFile", "output.mp4");
    // create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));

    setVideoSrc(url);
    // set the state to not processing
    setIsProcessing(false);
  }



  // create a function that takes a video into segmemts of

  const splitVideoSplit = async () => {
    // set the state to processing
    setIsProcessing(true);
    // create a new ffmpeg instance
    const ffmpeg = createFFmpeg({ log: true });
    // load the ffmpeg instance
    await ffmpeg.load();
    // write the video file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));
    // run the ffmpeg command
    await ffmpeg.run("-i", "test.mp4", "-f", "segment", "-segment_time", "1", "-c", "copy", "output%03d.mp4");
    // read the result
    const data = ffmpeg.FS("readFile", "output.mp4");
    // create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));

    setVideoSrc(url);
    // set the state to not processing
    setIsProcessing(false);
  }


  // create a function that splits the video into two parts at a time frame the end user chooses.

  useEffect(() => {
    const timestamp1 = "00:00:00";
  });

  const splitVideo = async () => {
    // set the state to processing
    setIsProcessing(true);
    // create a new ffmpeg instance
    const ffmpeg = createFFmpeg({ log: true });
    // load the ffmpeg instance
    await ffmpeg.load();
    // write the video file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));
    // run the ffmpeg command
    await ffmpeg.run("-i", "test.mp4", "-ss", "00:00:00", "-t", "00:00:10", "-c", "copy", "output.mp4");
    // read the result
    const data = ffmpeg.FS("readFile", "output.mp4");
    // create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
  } 


  // create a function that taskes a video and outputs the time of the video as a variable.

  const [videoTime] = useState("");

  const getVideoTime = async (time) => {
    // set the state to processing
    setIsProcessing(true);
    // create a new ffmpeg instance
    const ffmpeg = createFFmpeg({ log: true });
    // load the ffmpeg instance
    await ffmpeg.load();
    // write the video file to memory
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(videoFile));
    // run the ffmpeg command
    await ffmpeg.run("-i", "test.mp4", "-f", "ffmetadata", "metadata.txt");
    // read the result
    const time = ffmpeg.FS("readFile", "metadata.txt");
    console.log(time);

    // set the state to not processing
    setIsProcessing(false);

    return time;
  }


	return (
		<div className="app">
			<video src={videoSrc} controls></video>
			<br />
			<p>Choose an image</p>
			<input type="file" id="image" accept="image/*" onChange={handleChangeImage}></input>
			<p></p>
			<p>Choose an Sound</p>
			<input type="file" id="sound" accept="sound/*" onChange={handleChangeSound}></input>
			<p></p>
			<p>Choose a Video</p>
			<input type="file" id="video" accept="video/*" onChange={handleChangeVideo}></input>
			<p></p>
			<button onClick={convertAudioToSubtitles}>Create Our Video</button>
			<p></p>
			<button onClick={convertToGif}>Convert your video to a gif</button>
			<p></p>
      <button onClick={getVideoTime}>get video time</button>
			<img src={gifSrc}/>

      







		</div>
	);
}
