import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice.js";
import { loginUser, validateEmail } from "../../services/authService.jsx";
import Loader from "../../components/loader/loader.jsx";
import "./App.css";


const initialState = {
	email: "",
	password: "",
};

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setformData] = useState(initialState);
	const { email, password } = formData;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setformData({ ...formData, [name]: value });
	};

	const login = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			return toast.error("All fields are required");
		}

		if (!validateEmail(email)) {
			return toast.error("Please enter a valid email");
		}

		const userData = {
			email,
			password,
		};
		setIsLoading(true);
		try {
			const data = await loginUser(userData);
			console.log(data);
			await dispatch(SET_LOGIN(true));
			await dispatch(SET_NAME(data.name));
			navigate("/dashboard");
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	return (
		<div className="Auth-form-container">
			{isLoading && <Loader />}
			<form onSubmit={login} className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign In</h3>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input type="email" name="email" value={email} onChange={handleInputChange} className="form-control mt-1" placeholder="Enter email" required />
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input type="password" name="password" value={password} onChange={handleInputChange} className="form-control mt-1" placeholder="Enter password" required />
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">
							Login
						</button>
					</div>
					<Link to="/forgot">Forgot Password?</Link>
					<div>
						<p className="forgot-password text-right mt-2">
							Don't have an account? <Link to="/register">Register</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
