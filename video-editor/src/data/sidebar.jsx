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
		path: "/video-editor-ToGif",
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
