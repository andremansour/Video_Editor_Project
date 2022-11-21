import React, { useState, useEffect } from "react";
import { fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/helpers";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import VideoFilePicker from "../HelpersComps/VideoFilePicker";
import OutVideo from "../HelpersComps/OutVideo";
import { ffmpeg } from "../../App";

// const ffmpeg = createFFmpeg({
// 	corePath: "./ffmpeg_core_dist/ffmpeg-core.js", // Path to ffmpeg-core.js
// 	log: true,
// });


// function that takes video and sound and creates video
// const createVideo = async () => {
//   await ffmpeg.load();
//   ffmpeg.FS("writeFile", "video.mp4", await fetchFile(videoFile));
//   ffmpeg.FS("writeFile", "sound.mp3", await fetchFile(soundFile));

//   await ffmpeg.run("-i", "video.mp4", "-i", "sound.mp3", "-c:v", "copy", "-c:a", "aac", "-strict", "experimental", "-map", "0:v:0", "-map", "1:a:0", "output.mp4");
//   const data = ffmpeg.FS("readFile", "output.mp4");
//   setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" })));
//   return data;
// };



function VideoEditorCombine() {
    useRedirectLoggedOutUser("/login");



    return (
        <div className="app">
            <section className="deck">
				{/* <article className="grid_txt_2">
					<VideoFilePicker handleChange={handleChange} showVideo={!!inputVideoFile}>
						<div className="bord_g_2 p_2">
							<video src={inputVideoFile ? URL : null} autoPlay controls muted onLoadedMetadata={handleLoadedData} width="450"></video>
						</div>
					</VideoFilePicker>
				</article>
				<OutputVideo videoSrc={trimmedVideoFile} handleDownload={() => helpers.download(trimmedVideoFile)} /> */}
			</section>
            
        </div>
    );
}

export default VideoEditorCombine;