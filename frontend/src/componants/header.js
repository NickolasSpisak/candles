import React from "react";
import { Link, withRouter } from "react-router-dom";

import { isAuthenticated, logout } from "../helpers/auth";

const Header = ({ navigate }) => {
  const handleLogout = (e) => {
    logout(() => {
      navigate.push("/signin");
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!isAuthenticated() && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/signin"
                      className="nav-link active"
                      aria-current="page"
                    >
                      <i className="fas fa-sign-in-alt"></i> Sign in
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      <i className="fas fa-edit"></i> Sign up
                    </Link>
                  </li>
                </>
              )}
              {!isAuthenticated() && isAuthenticated().role === 0 && (
                <>
                  <li className="nav-item">
                    <Link to="/user/dashboard" className="nav-link">
                      <i className="fas fa-home"></i> Dashboard
                    </Link>
                  </li>
                </>
              )}
              {!isAuthenticated() && isAuthenticated().role === 1 && (
                <>
                  <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-link">
                      <i className="fas fa-home"></i> Dashboard
                    </Link>
                  </li>
                </>
              )}
              {!isAuthenticated() && (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-link text-secondary text-decoration-none pl-0"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default withRouter(Header);
