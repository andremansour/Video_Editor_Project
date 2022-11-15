import React from "react";
import { useState } from "react";
import "./Sidebar.scss";
import './../../../src/index.css'
import { AiOutlineVideoCamera } from "react-icons/ai";
import menu from "../../data/sidebar.jsx";
import SidebarItem from "./SidebarItem";
import {HiMenuAlt3} from 'react-icons/hi'
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {

	const [isOpen, setIsOpen] = useState(false);
	
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const navigate = useNavigate();

	const goHome = () => {
		navigate("/");
	};

	return (
		<div className="layout">
			<div className="sidebar" style={{width: isOpen ? "230px":"60px"}}>
				<div className="top_section">
					<div className="logo" style={{display: isOpen? "block": "none"}}>
						<AiOutlineVideoCamera size={35} onClick={goHome}/>
					</div>

					<div className="bars" style={{marginLeft: isOpen? "100px": "0px"}}>
						<HiMenuAlt3 onClick={toggleSidebar}/>
					</div>
				</div>
				{menu.map((item, index) => (
					<SidebarItem key={index} item={item} isOpen={isOpen}/>	
				))}
			</div>
			<main style={{paddingLeft: isOpen ? "230px": "60px", transition: "all .5s"}}>{children}</main>
		</div>
	);
};

export default Sidebar;
