import React from "react";
import { Nav, Navbar, NavLink, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HidenLink";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
import LoaderImg from "../../assets/ffmpeg-wasm.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = async () => {
		await logoutUser();
		await dispatch(SET_LOGIN(false));
		navigate("/login");
	};

	return (
		<div className="home">
			<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">
						<AiOutlineVideoCamera size={35} />
						{"   "} Insta Video
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll" />
					<Navbar.Collapse className="justify-content-end">
						<Nav>
							<ShowOnLogout>
								<NavLink eventKey="1" as={Link} to="/register">
									<Button variant="light">Register</Button>
								</NavLink>{" "}
								<NavLink eventKey="2" as={Link} to="/login">
									<Button variant="dark">Login</Button>
								</NavLink>
							</ShowOnLogout>
							<ShowOnLogin>
								<NavLink eventKey="3" as={Link} to="/dashboard">
									<Button variant="dark">Dashboard</Button>
								</NavLink>{" "}
								<NavLink eventKey="4" as={Link} to="/video-editor">
									<Button variant="dark">Video Editor</Button>
								</NavLink>{" "}
								<NavLink eventKey="5" as={Link} to="/login" onClick={logout}>
									<Button variant="light">Logout</Button>
								</NavLink>
							</ShowOnLogin>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className="px-5 pt-5 my-5 text-center">
				<h1 className="display-4 fw-bold">Welcome to InstaVid.wasm</h1>
				<div className="col-lg-6 mx-auto">
					<p className="lead mb-4">Quickly convert, trim, combine and export your videos using the FFMPEG library! We provide a user-friendly interface for video editing, and users can save their edited videos in various formats.</p>
					<div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
						<ShowOnLogin>
							<Link eventKey="3" to="/dashboard">
								<Button className="btn btn-primary btn-lg px-4 me-sm-3" variant="dark">
									Dashboard
								</Button>
							</Link>{" "}
						</ShowOnLogin>
						<ShowOnLogout>
							<Link eventKey="2" to="/register">
								<Button className="btn btn-primary btn-lg px-4 me-sm-3" variant="dark">
									Get Started
								</Button>
							</Link>{" "}
						</ShowOnLogout>
					</div>
				</div>
				<div className="overflow-hidden">
					<div className="container px-5">
						<img src={LoaderImg} className="img-fluid rounded-3 shadow mt-5 mb-5" width="700" height="500" />
					</div>
				</div>
			</div>
			<footer className="footer">
				<div className="container">
					<div className="col-md-4 d-flex align-items-center">
						<span className="text-muted ">&copy; 2022 InstaVid.wasm</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Home;
