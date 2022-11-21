import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectName, SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
import { Nav, Navbar, NavLink, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const name = useSelector(selectName);

	const logout = async () => {
		await logoutUser();
		await dispatch(SET_LOGIN(false));
		navigate("/login");
	};

	return (
		<div className="--pad header">
			<div className="--flex-between">
				<h3>
					<span className="--fw-thin">Welcome, </span>
					<span className="--color-dark">{name}</span>
				</h3>
				<NavLink as={Link} to="/login" onClick={logout}>
					<Button variant="light">Logout</Button>
				</NavLink>
			</div>
			<hr />
		</div>
	);
};

export default Header;
