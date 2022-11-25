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
				<div class="position-relative position-relative-example">
					<div class="position-absolute top-0 start-0">
						<h3 className="float-right-top">
							<span className="--fw-thin greet">Welcome, </span>
							<span className="--color-dark">{name}</span>
						</h3>
					</div>
				</div>
				<NavLink as={Link} to="/login" onClick={logout}>
					<Button variant="light">Logout</Button>
				</NavLink>
			</div>
			<hr />
		</div>
	);
};

export default Header;
