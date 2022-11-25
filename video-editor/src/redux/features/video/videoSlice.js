import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import videoService from "../../../services/videoService";

const initialState = {
	video: null,
	videos: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// create new video

export const createVideo = createAsyncThunk("videos/create", async (videoData, thunkAPI) => {
	try {
		return await videoService.createVideo(videoData);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		console.log(message);
		toast.error(message);
		return thunkAPI.rejectWithValue(message);
	}
});

const videoSlice = createSlice({
	name: "video",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createVideo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createVideo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				console.log(action.payload);
				state.videos.push(action.payload);
				toast.success("Video created successfully");
			})
			.addCase(createVideo.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				toast.error(action.payload);
			});
	},
});

export const {} = videoSlice.actions;

export const videoIsLoading = (state) => state.video.isLoading;

export default videoSlice.reducer;
