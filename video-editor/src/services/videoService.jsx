import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/videos`;

// create new video
export const createVideo = async (videoData) => {
	try {
		const response = await axios.post(API_URL, videoData, { withCredentials: true });
		if (response.statusText === "OK") {
			toast.success("Video Created successfully");
		}
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		toast.error(message);
	}
};

const videoService = {
	createVideo,
};

export default videoService;
