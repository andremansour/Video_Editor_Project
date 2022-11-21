import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";
import "./App.css";

const initialState = {
	password: "",
	password2: "",
};

const Reset = () => {
	const [formData, setformData] = useState(initialState);
	const { password, password2 } = formData;

	const { resetToken } = useParams();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setformData({ ...formData, [name]: value });
	};

	const reset = async (e) => {
		e.preventDefault();

		// check if password is 6 characters or more
		if (password.length < 6) {
			return toast.error("Passwords must be up to 6 characters");
		}

		if (password !== password2) {
			return toast.error("Passwords do not match");
		}

		const userData = {
			password,
			password2,
		};

		try {
			const data = await resetPassword(userData, resetToken);
			toast.success(data.message);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="Auth-form-container">
			<form onSubmit={reset} className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Reset Password</h3>
					<div className="form-group mt-3">
						<label>New Password</label>
						<input type="password" name="password" value={password} onChange={handleInputChange} className="form-control mt-1" placeholder="Enter password" required />
					</div>
					<div className="form-group mt-3">
						<label>Confirm New Password</label>
						<input type="password" name="password2" value={password2} onChange={handleInputChange} className="form-control mt-1" placeholder="Enter password" required />
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">
							Reset Password
						</button>
					</div>
					<div>
						<p className="forgot-password text-right mt-2">
							<Link to="/home">Home</Link>
						</p>
					</div>
					<div>
						<p className="forgot-password text-right mt-2">
							<Link to="/login">Login</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Reset;
