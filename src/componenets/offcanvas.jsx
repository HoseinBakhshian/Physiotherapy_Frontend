import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../assets/CSS/offcanvas.css";

const Offcanvas = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {};

  return (
    <div>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            منو
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div id="offcanvas-list">
            <ul className="list-unstyled text-center p-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  {/* <i className="bi bi-house-fill ms-1"></i> */}
                  <span className="">خانه</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/archive"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  <span className="">بایگانی</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/newPatient"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  <span className=""> بیمار جدید </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/files"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  <span className=""> پرونده ها </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/setting"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  <span className="">پروفایل </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offcanvas;
