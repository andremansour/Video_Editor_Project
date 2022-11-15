import React from "react";
// import {Link} from "react-router-dom";
import './../../../src/index.css'

const Header = () => {
    return (
        <div className="--pad header">
        <div className="--flex-between">
          <h3>
            <span className="--fw-thin">Welcome, </span>
            <span className="--color-danger">Name</span>
          </h3>
          <button className="--btn --btn-danger">
            Logout
          </button>
        </div>
        <hr />
      </div>
    );
};

export default Header;