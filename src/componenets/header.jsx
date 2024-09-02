import React from "react";
import "../assets/CSS/header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div id="nav" className="container d-flex flex-row-reverse justify-content-between p-4 align-items-center">
     
      <div className="nav_icon_wrapper d-flex align-items-center p-0">
        <div>
          <span className="nav_icon_text">Fahim</span>
          <span className="nav_icon_text">Physiotherapy</span>
          <span className="nav_icon_text">Clinic</span>
        </div>
        <img src={require("../assets/images/logo.png")} alt="nav icon" />
      </div>

        <ul className="list-unstyled d-none d-md-flex text-light p-0 m-0">
          <li className=" ms-4">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? "navbar_active" : "";
              }}
            >
              <span className="">خانه</span>
            </NavLink>
          </li>
          <li className="ms-4">
            <NavLink
              to="/archive"
              className={({ isActive }) => {
                return isActive ? "navbar_active" : "";
              }}
            >
              <span className="">بایگانی</span>
            </NavLink>
          </li>
          <li className="ms-4">
            <NavLink
              to="/newPatient"
              className={({ isActive }) => {
                return isActive ? "navbar_active" : "";
              }}
            >
              <span className=""> بیمار جدید </span>
            </NavLink>
          </li>
          <li className="ms-4">
            <NavLink
              to="/files"
              className={({ isActive }) => {
                return isActive ? "navbar_active" : "";
              }}
            >
              <span className="">  پرونده ها </span>
            </NavLink>
          </li>
          <li className="ms-4">
            <NavLink
              to="/setting"
              className={({ isActive }) => {
                return isActive ? "navbar_active" : "";
              }}
            >
              <span className=""> پروفایل </span>
            </NavLink>
          </li>
        </ul>
  
      <div id="offcanvas_btn" className="d-md-none pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <div></div>
        <div></div>
        <div></div>
      </div>


    </div>
  );
};

export default Header;
