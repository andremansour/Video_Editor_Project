import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

import { AiOutlineVideoCamera } from "react-icons/ai";

const Home = () => {
	return (
		<div className="home">
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="#home">
						<AiOutlineVideoCamera size={35} />Insta Video
					</Navbar.Brand>
					<Navbar.Collapse className="justify-content-end">
						<Link to="/register">
							<Button variant="light">Register</Button>
						</Link>{" "}
						<Link to="/login">
							<Button variant="dark">Sign In</Button>
						</Link>{" "}
						<Link to="/dashboard">
							<Button variant="dark">Dashboard</Button>
						</Link>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div className="px-4 pt-5 my-5 text-center border-bottom">
				<h1 className="display-4 fw-bold">Centered screenshot</h1>
				<div className="col-lg-6 mx-auto">
					<p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
					<div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
						<button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">
							Primary button
						</button>
						<button type="button" className="btn btn-outline-secondary btn-lg px-4">
							Secondary
						</button>
					</div>
				</div>
				<div className="overflow-hidden">
					<div className="container px-5">{/* <img src="https://getbootstrap.com/docs/5.2/examples/heroes/bootstrap-docs.png" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy" /> */}</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
