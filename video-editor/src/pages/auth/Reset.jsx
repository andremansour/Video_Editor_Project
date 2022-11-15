import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Reset = () => {
	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Reset Password</h3>
					<div className="form-group mt-3">
						<label>New Password</label>
						<input type="password" name="password" className="form-control mt-1" placeholder="Enter password" required />
					</div>
					<div className="form-group mt-3">
						<label>Confirm New Password</label>
						<input type="password" name="password" className="form-control mt-1" placeholder="Enter password" required />
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
