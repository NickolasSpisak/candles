import React, { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { signup } from "../api/auth";
import "./Signup.css";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({ ...formData, loading: true });
      signup(data)
        .then((response) => {
          console.log(response);
          setFormData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error:", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && showSuccessMsg(successMsg)}
          {errorMsg && showErrorMsg(errorMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            {/* username */}
            <div className="form-group input-group pb-4">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                name="username"
                value={username}
                className="form-control"
                placeholder="Username"
                type="text"
                onChange={handleChange}
              />
            </div>
            {/* email */}
            <div className="form-group input-group pb-4">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-envelope"></i>
                </span>
              </div>
              <input
                name="email"
                value={email}
                className="form-control"
                placeholder="Email address"
                type="email"
                onChange={handleChange}
              />
            </div>
            {/* password */}
            <div className="form-group input-group pb-4">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                name="password"
                value={password}
                className="form-control"
                placeholder="Create Password"
                type="password"
                onChange={handleChange}
              />
            </div>
            {/* password2 */}
            <div className="from-group input-group pb-4">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                name="password2"
                value={password2}
                className="form-control"
                placeholder="Confirm Password"
                type="password"
                onChange={handleChange}
              />
            </div>
            {/* signup button */}
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block form-control"
              >
                Signup
              </button>
            </div>
            {/*already have account */}
            <p className="text-center text-white">
              Have an account? <Link to="/signin">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
