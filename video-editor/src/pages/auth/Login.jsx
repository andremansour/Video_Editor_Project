import React from "react";
import { Link } from "react-router-dom";
// import { AiOutlineVideoCamera } from "react-icons/ai";
// import { Button, Container, Navbar } from "react-bootstrap";
import "./App.css";

const Login = () => {
	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign In</h3>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input type="email" name="email" className="form-control mt-1" placeholder="Enter email" required />
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input type="password" name="password" className="form-control mt-1" placeholder="Enter password" required />
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
