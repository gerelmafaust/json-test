import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div id="nav-brand">
            <Link to="/">Json Test</Link>
          </div>
          <div className="nav-links-row">
            <ul className="navbar navbar-navb">
              <li className="navbar-navb-li">
                <Link to="/one">First</Link>
              </li>
              <li className="navbar-navb-li">
                <Link to="/two">Second</Link>
              </li>
              <li className="navbar-navb-li">
                <Link to="/three">
                Third
                </Link>
                
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
