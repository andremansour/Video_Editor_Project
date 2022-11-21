import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService.jsx";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice.js";
import Loader from "../../components/loader/loader.jsx";
import "./App.css";

const initalState = {
	name: "",
	email: "",
	password: "",
	password2: "",
};

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState(initalState);
	const { name, email, password, password2 } = formData;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const register = async (e) => {
		e.preventDefault();

		if (!name || !email || !password) {
			return toast.error("All fields are required");
		}
		if (password.length < 6) {
			return toast.error("Passwords must be up to 6 characters");
		}
		if (!validateEmail(email)) {
			return toast.error("Please enter a valid email");
		}
		if (password !== password2) {
			return toast.error("Passwords do not match");
		}

		const userData = {
			name,
			email,
			password,
		};
		setIsLoading(true);
		try {
			const data = await registerUser(userData);
			// console.log(data);
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
			<form onSubmit={register} className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Register</h3>
					<div className="form-group mt-3">
						<label>Name</label>
						<input type="text" name="name" value={name} onChange={handleInputChange} className="form-control mt-1" placeholder="Enter your name" required />
					</div>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input type="email" name="email" value={email} onChange={handleInputChange} className="form-control mt-1" placeholder="Enter email" required />
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input type="password" name="password" value={password} onChange={handleInputChange} className="form-control mt-1" placeholder="Enter password" required />
					</div>
					<div className="form-group mt-3">
						<label>Confirm Password</label>
						<input type="password" name="password2" value={password2} onChange={handleInputChange} className="form-control mt-1" placeholder="Confirm password" required />
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">
							Register
						</button>
					</div>
					<div>
						<p className="forgot-password text-right mt-2">
							Already have an account? <Link to="/login">Login</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
