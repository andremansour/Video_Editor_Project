import react from "react";
import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
	{
		title: "Dashboard",
		icon: <FaTh />,
		path: "/dashboard",
	},
	{
		title: "Trim Video",
		icon: <BiImageAdd />,
		path: "/video-editor-trim",
	},
	{
		title: "Combine Content",
		icon: <BiImageAdd />,
		path: "/video-editor-combine",
	},
	{
		title: "Video to Gif",
		icon: <BiImageAdd />,
		path: "/video-editor-to-gif",
	},
	{
		title: "Mute Video Audio",
		icon: <BiImageAdd />,
		path: "/video-editor-mute-video-audio",
	},
	{
		title: "Convert Mp3 to Mp4",
		icon: <BiImageAdd />,
		path: "/video-editor-convert-mp3-to-mp4",
	},
	{
		title: "Crop Your from 16:9 to 9:16",
		icon: <BiImageAdd />,
		path: "/video-editor-video-crop",
	},
	{
		title: "Account",
		icon: <FaRegChartBar />,
		childrens: [
			{
				title: "Profile",
				path: "/profile",
			},
			{
				title: "Edit Profile",
				path: "/edit-profile",
			},
		],
	}
];

export default menu;
