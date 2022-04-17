import React, { useState } from "react";
import { createCategory } from "../api/category";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import isEmpty from "validator/lib/isEmpty";
const AdminDashboard = () => {
  const [category, setCategory] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessages = (e) => {
    setErrorMsg("");
    setSuccessMsg("");
  };
  const handleCategoryChange = (e) => {
    setErrorMsg("");
    setSuccessMsg("");
    setCategory(e.target.value);
  };
  const handleCategorySubmit = (e) => {
    e.preventDefault();

    if (isEmpty(category)) {
      setErrorMsg("Please enter a category");
    } else {
      const data = { category };
      setLoading(true);
      createCategory(data)
        .then((response) => {
          setLoading(false);
          setSuccessMsg(response.data.successMessage);
          setCategory("");
        })
        .catch((err) => {
          setLoading(false);
          setErrorMsg(err.response.data.errorMessage);
        });
    }
  };

  const showHeader = () => {
    <div className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>
              <i className="fas fa-home"> Dashboard</i>
            </h1>
          </div>
        </div>
      </div>
    </div>;
  };
  const showActionBtns = () => {
    <div className="bg-light my-2">
      <div className="container">
        <div className="row pb-3">
          <div className="col-md-4 my-1">
            <button
              className="btn btn-outline-info btn-block"
              data-toggle="modal"
              data-target="#addCategoryModal"
            >
              <i className="fas fa-plus">Add Category</i>
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button className="btn btn-outline-warning btn-block">
              <i className="fas fa-plus">Add Candle</i>
            </button>
          </div>
          <div className="col-md-4 my-1">
            <button className="btn btn-outline-success btn-block">
              <i className="fas fa-money-check-alt">View Orders</i>
            </button>
          </div>
        </div>
      </div>
    </div>;
  };
  const showCategoryModal = () => {
    <div id="addCategoryModal" className="modal" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Add Catergory</h5>
              <button className="close" data-dismiss="modal">
                <span>
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <div className="modal-body my-2">
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}
              {loading ? (
                <div className="text-center">{showLoading()}</div>
              ) : (
                <>
                  <label className="text-secondary">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button data-dismiss="modal" className="btn btn-secondary">
                Close
              </button>
              <button type="submit" className="btn btn-info">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
  };
  return (
    <section>
      {showHeader()}
      {showActionBtns()}
      {showCategoryModal()}
    </section>
  );
};

export default AdminDashboard;
