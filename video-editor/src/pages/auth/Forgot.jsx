import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Forgot = () => {
	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Forgot Password</h3>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input type="email" name="email" className="form-control mt-1" placeholder="Enter email" required />
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
