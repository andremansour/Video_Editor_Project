import React from "react";
import { Link } from "react-router-dom";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import moon from "../../assets/moon-sea.jpg";
import trim from "../../assets/trim.jpg";
import combine from "../../assets/combine.jpg"
import mp3 from "../../assets/mp3.jpg"
import crop from "../../assets/chop.jpg"
import gif from "../../assets/gif.jpg"
import slow from "../../assets/slow.png"
import { height } from "@mui/system";



const Dashboard = () => {
	useRedirectLoggedOutUser("/login");

	let datas = [
		{	
			id:	1,
			name: "Trim",
			img: trim,
			desc: "Chop off the footage you don’t want. Keep only the good stuff.",
			link:"/video-editor-trim",
			title:"Trim"
		},
		{
			name: "Combine Video and Audio",
			img: combine,
			desc: "Add a Audio to any Video!",
			link:"/video-editor-combine",
			title:"Combine Videos"
		},
		{
			name: "Mp4 to Mp3",
			img: mp3,
			desc: "Convert videos to audio through conversion!",
			link:"/video-editor-convert-mp3-to-mp4",
			title:"Video to Audio"
		},
		{
			name: "Crop your video!",
			img: crop,
			desc: "Crop your video to the right shape for Facebook, Instagram, Twitter, and more.",
			link:"/video-editor-video-crop",
			title:"Crop your video"
		},
		{
			name: "Make a Gif!",
			img: gif,
			desc: "Get creative! Take sections of the video and turn it into a funny GIF!",
			link:"/video-editor-to-gif",
			title:"Make a Gif"
		},
		{
			name: "Slowmotion video!",
			img: slow,
			desc: "Add a Slow Motion Effect to Your Video",
			link:"/video-editor-slow-motion",
			title:"Slowmotion video"
		},
	];

	return (
		<div>
			<div className="container">
				<div className="row">
					{datas.map((data, index) => (
						<div key={index} className="col-sm-12 col-md-6 col-lg-4">
							<div className="card border-0" style={{ width: "200px", height:"350px" }}>
								<img src={data.img} className="card-img-top" />
								<div className="card-body text-center">
									<h5 className="card-title">{data.title}</h5>
									<p className="card-text">{data.desc}</p>
									<button type="button" className="btn btn-primary button-solid">
										<Link to={data.link}>{data.name}</Link>
									</button>
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
