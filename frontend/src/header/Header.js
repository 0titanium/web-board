import React from "react";
import {
    Link
  } from "react-router-dom";

import './Header.css'

function Header() {
    return(
        <header className="main-header">
            <div className="header-box">
                <Link to="/">
                    <h1 className="header-link">Web Board</h1>
                </Link>
            </div>
        </header>
    );
}
export default Header;