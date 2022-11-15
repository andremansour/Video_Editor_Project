import React, { useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

import './App.css'

function VideoEditor() {
  // const [count, setCount] = useState(0)

  const [videoSrc, setVideoSrc] = useState("");
  // const [videoSrc2, setVideoSrc2] = useState("");
	// const [gifSrc, setGifSrc] = useState("");

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

    const createVideo = async () => {
      await ffmpeg.load();
      ffmpeg.FS("writeFile", "image.png", await fetchFile(imageFile));
      ffmpeg.FS("writeFile", "sound.mp3", await fetchFile(soundFile));
  
      await ffmpeg.run("-framerate", "1/10", "-i", "image.png", "-i", "sound.mp3", "-c:v", "libx264", "-t", "1000", "-pix_fmt", "yuv420p", "-vf", "scale=1920:1080", "test.mp4");
      const data = ffmpeg.FS("readFile", "test.mp4");
      setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })));
    };
  

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
			<button onClick={createVideo}>Create Our Video</button>
		</div>
  )
}

export default VideoEditor
