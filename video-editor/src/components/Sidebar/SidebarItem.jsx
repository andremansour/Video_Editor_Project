import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ item, isOpen }) => {
	const activeLink = ({ isActive }) => (isActive ? "active" : "link");
	const activeSublink = ({ isActive }) => (isActive ? "active" : "link");

	if (item.childrens) {
		const [expandMenu, setExpandMenu] = useState(false);

		return (
			<div className={expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"}>
				<div className="sidebar-title">
					<span>
						{item.icon && <div className="icon">{item.icon}</div>}
						{isOpen && <div className="title">{item.title}</div>}
					</span>
					<MdKeyboardArrowRight size={25} className="arrow-icon" onClick={() => setExpandMenu(!expandMenu)} />
				</div>
				<div className="sidebar-content">
					{item.childrens.map((child, index) => (
						<div className="s-child" key={index}>
							<NavLink to={child.path} className={activeSublink}>
								<div className="sidebar-item">
									<div className="sidebar-title">
										{child.icon && <div className="icon">{child.icon}</div>}
										{isOpen && <div className="title">{child.title}</div>}
									</div>
								</div>
							</NavLink>
						</div>
					))}
				</div>
			</div>
		);
	} else {
		return (
			<NavLink to={item.path} className={activeLink}>
				<div className="sidebar-item s-parent">
					<div className="sidebar-title">
						<span>
							{item.icon && <div className="icon">{item.icon}</div>}
							{isOpen && <div className="title">{item.title}</div>}
						</span>
					</div>
				</div>
			</NavLink>
		);
	}
};

export default SidebarItem;
