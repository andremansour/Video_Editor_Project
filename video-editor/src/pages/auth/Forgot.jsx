import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {forgotPassword, validateEmail }	from "../../services/authService.jsx";
import "./App.css";


const Forgot = () => {
	const [email, setEmail] = useState("");

	const forgot = async (e) => {
		e.preventDefault();
		
		// If email is empty
		if (!email) {
			return toast.error("All fields are required");
		}

		// If email is not valid
		if(!validateEmail(email)) {
			return toast.error("Please enter a valid email");
		}

		// put user data in an object
		const userData = {
			email,
		};

		// pass user data to forgotPassword function
		await forgotPassword(userData);
		setEmail("");

	};
	 
	return (
		<div className="Auth-form-container">
			<form onSubmit={forgot} className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Forgot Password</h3>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mt-1" placeholder="Enter email" required />
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">
							Get reset email
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

export default Forgot;
