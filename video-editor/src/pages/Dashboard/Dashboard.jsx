import React from "react";
import { Link } from "react-router-dom";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import moon from "../../assets/moon-sea.jpg";

const Dashboard = () => {
	useRedirectLoggedOutUser("/login");

	let data = [
		{
			name: "Trim",
			img: moon,
			desc: "",
			link:"/video-editor-trim"
		},
		{
			name: "Combine",
			img: moon,
			desc: "",
			link:"/video-editor-combine"
		},
		{
			name: "Mp4 to Mp3",
			img: moon,
			desc: "",
			link:"/video-editor-convert-mp3-to-mp4"
		},
		{
			name: "Crop your video!",
			img: moon,
			desc: "",
			link:"/video-editor-video-crop"
		},
		{
			name: "Make a Gif!",
			img: moon,
			desc: "",
			link:"/video-editor-to-gif"
		},
	];

	return (
		<div>
			<div className="container">
				<div className="row">
					{data.map((data) => (
						<div className="col-4">
							<div className="card" style={{ width: "18rem" }}>
								<img src={data.img} class="card-img-top" />
								<div class="card-body">
									<h5 class="card-title">Card title</h5>
									<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
									<a class="btn btn-primary">
										<Link to={data.link}>{data.name}</Link>
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
