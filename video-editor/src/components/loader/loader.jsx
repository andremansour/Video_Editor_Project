import React from "react";
import LoaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";
import "./loader.scss";

export const Loader = () => {
	return ReactDOM.createPortal(
		<div className="wrapper">
			<div className="loader">
				<img src={LoaderImg} alt="Loading..." />
			</div>
		</div>,
		document.getElementById("loader")
	);
};

export const LoaderGif = () => {
  return(
    <div className="--center-all">
      <img src={Loader} alt="Loading..." />
    </div>
  )
}

export default Loader;
