import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../services/authService";

const useRedirectLoggedOutUser = (path) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	React.useEffect(() => {
		const useRedirectLoggedOutUser = async () => {
			const isLoggedIn = await getLoginStatus();
			dispatch(SET_LOGIN(isLoggedIn));

			if (!isLoggedIn) {
				toast.info("The session expired. Please login again.");
				navigate(path);
				return;
			}
		};
        useRedirectLoggedOutUser();
	}, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
