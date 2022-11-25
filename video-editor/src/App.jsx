import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Layout from "./components/layout/Layout.jsx";
import VideoEditorTrim from "./pages/VideoEditorTrim/VideoEditorTrim.jsx";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { getLoginStatus } from "../src/services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import HomeReplace from "./pages/Home/HomeReplace";
import VideoEditorComnbine from "./pages/VideoEditorCombine/VideoEditorCombine";
import VideoEditorToGif from "./pages/VideoEditorVideoToGif/VideoEditorVideoToGif";
import VideoMp4ToMp3 from "./pages/VideoMp4ToMp3/VideoMp4ToMp3";
import VideoEditorMuteAudio from "./pages/VideoEditorMuteAudio/VideoEditorMuteAudio";
import VideoEditorCropVideo from "./pages/VideoEditorCropVideo/VideoEditorCropVideo";
import VideoEditorSlowMotion from "./pages/VideoEditorSlowMotion/VideoEditorSlowMotion"

axios.defaults.withCredentials = true;

export const ffmpeg = createFFmpeg({
	corePath: "./ffmpeg_core_dist/ffmpeg-core.js", // Path to ffmpeg-core.js
	log: true,
});

(async function () {
	await ffmpeg.load();
})();

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		async function loginStatus() {
			const status = await getLoginStatus();
			dispatch(SET_LOGIN(status));
		}
		loginStatus();
	}, [dispatch]);

	return (
		<BrowserRouter>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot" element={<Forgot />} />
				<Route path="/resetpassword/:resetToken" element={<Reset />} />

				<Route
					path="/dashboard"
					element={
						<Sidebar>
							<Layout>
								<Dashboard />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path="/video-editor-trim"
					element={
						<Sidebar>
							<Layout>
								<VideoEditorTrim />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path="/video-editor-combine"
					element={
						<Sidebar>
							<Layout>
								<VideoEditorComnbine />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path="/video-editor-to-gif"
					element={
						<Sidebar>
							<Layout>
								<VideoEditorToGif />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path="/video-editor-mute-video-audio"
					element={
						<Sidebar>
							<Layout>
								<VideoEditorMuteAudio />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path="/video-editor-convert-mp3-to-mp4"
					element={
						<Sidebar>
							<Layout>
								<VideoMp4ToMp3 />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path="/video-editor-video-crop"
					element={
						<Sidebar>
							<Layout>
								<VideoEditorCropVideo />
							</Layout>
						</Sidebar>
					}
				/>
				<Route
					path="/video-editor-slow-motion"
					element={
						<Sidebar>
							<Layout>
								<VideoEditorSlowMotion />
							</Layout>
						</Sidebar>
					}
				/>
				<Route path="/home-replace" element={<HomeReplace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
