import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainAxios } from "../services/MainAxios";
import swal from "sweetalert";
import "../assets/CSS/signin.css";
import { Spinner } from "./spinner";

const Signin = () => {
  const navigate = useNavigate();
  const userName_Ref = useRef();
  const Password_Ref = useRef();
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    MainAxios.get("/user/authCheck")
    .then((res) => {   
      if (res.data.authenticated) {
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);





  const handlebtn = (e) => {
    e.preventDefault();

    let user = {
      userName: userName_Ref.current.value,
      Password: Password_Ref.current.value,
    };
    setLoading(true);
    MainAxios.post("/user/login", user)
      .then((res) => {
        console.log("teest");
        setLoading(false);
        if (res.data.login) {
          navigate("/");
        } else {
          swal(res.data.mess, "", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row  justify-content-center align-items-baseline  pt-0 g-0" id="signin">
      <div className="col-11  col-sm-9  col-md-6 col-lg-5  text-bg-light mt-5 rounded-3  shadow border border-1">
        <form className="row  gy-3  p-4" dir="rtl" onSubmit={handlebtn}>
          <legend className=" h4 fw-normal text-success mb-0" htmlFor="tt">
            ورود به حساب
          </legend>
          <hr className="mt-2" />

          <div className="col-13">
            <label htmlFor="username" className="form-label mb-1">
              نام کاربری
              <span className="required">*</span>
            </label>
            <input type="text" className="form-control" id="username" ref={userName_Ref} required />
          </div>

          <div className="col-12">
            <label htmlFor="password" className="form-label mb-1">
              رمز عبور
              <span className="required">*</span>
            </label>
            <input type="password" className="form-control" id="password" ref={Password_Ref} required />
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-success w-50 mb-1">
              ورود
            </button>

            <div>
              <p className="small fw-lighter m-0 d-inline">اکانت قبلی ندارید؟ </p>
              <p className="d-inline link-primary pointer" onClick={() => navigate("/register")}>
                ثبت نام
              </p>
            </div>

            <div className="mt-1">
              <Spinner loading={loading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
