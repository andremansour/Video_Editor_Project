import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));

const initialState = {
	isLoggedIn: false,
	name: name ? name : " ",
	user: {
		name: " ",
		email: " ",
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			state.isLoggedIn = action.payload;
		},
		SET_NAME(state, action) {
			localStorage.setItem("name", JSON.stringify(state.name));
			state.name = action.payload;
		},
		SAVE_USER(state, action) {
			const profile = action.payload;
			state.user.name = profile.name;
			state.user.email = profile.email;
		},
	},
});

export const {
  login,
  SET_NAME,
  SAVE_USER,
} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;


export default authSlice.reducer;
