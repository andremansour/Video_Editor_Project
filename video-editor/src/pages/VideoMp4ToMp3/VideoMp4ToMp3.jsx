import React, { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/helpers";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
// import VideoFilePicker from "./VideoFilePicker";
// import OutputVideo from "./OutVideo";
// import RangeInput from "./RangeInput";

// const ffmpeg = createFFmpeg({
// 	corePath: "./ffmpeg_core_dist/ffmpeg-core.js", // Path to ffmpeg-core.js
// 	log: true,
// });


// (async function () {
//     await ffmpeg.load();
// })();

function VideoMp4ToMp3() {
    useRedirectLoggedOutUser("/login");



    return (
        <div className="app">
            
        </div>
    );
}

export default VideoMp4ToMp3;