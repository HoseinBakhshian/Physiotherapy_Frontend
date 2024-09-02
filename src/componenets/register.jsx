import React, { useEffect, useRef, useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../assets/CSS/register.css";
import { MainAxios } from "../services/MainAxios";
import { Spinner } from "./spinner";
const messages = {
  minLength: "حداقل 8 کاراکتر",
  specialChar: "دارای کاراکترهای خاص",
  number: "دارای عدد",
  capital: "دارای حروف بزرگ",
  match: "هماهنگی رمزعبور",
};

const rules = ["minLength", "specialChar", "number", "capital", "match"];

const Register = () => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const userName_Ref = useRef();
  const Password_Ref = useRef();
  const PasswordAgain_Ref = useRef();
  const Role_Ref = useRef();

  const navigate = useNavigate();


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

    if (passwordValidation) {
      let newUser = {
        userName: userName_Ref.current.value,
        Password: Password_Ref.current.value,
        Role: Role_Ref.current.value,
      };
      setLoading(true);
      MainAxios.post("/user/register", newUser).then((res) => {
      setLoading(false);

        if (res.data.isValid == true) {
          swal(res.data.mess, "", "success");
          navigate("/login");
        } else {
          swal(res.data.mess, "", "error");
        }
      });
    } else {
      Password_Ref.current.style.border = "1px solid red";
      PasswordAgain_Ref.current.style.border = "1px solid red";
    }
  };

  return (
    <div>
      <div className="row justify-content-center align-items-baseline pt-0 g-0" id="register">
        <div className=" col-11  col-sm-7   col-lg-5 col-xl-4  text-bg-light mt-5 rounded-3  shadow border border-1 mb-5">
          <form className="row p-4  justify-content-between gy-3" dir="rtl" onSubmit={handlebtn}>
            <legend className="h4 fw-normal text-success mb-0" htmlFor="tt">
              اکانت جدید
            </legend>
            <hr className="mt-2" />

            <div className="col-12">
              <label htmlFor="username" className="form-label mb-1">
                نام کاربری
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" id="username" ref={userName_Ref} required />
            </div>

            <div className="col-12  ">
              <label htmlFor="role" className="form-label mb-1">
                نقش
                <span className="required">*</span>
              </label>
              <select id="role" className="form-select " ref={Role_Ref}>
                <option value="admin">ادمین</option>
                <option selected value="employee">
                  کارمند
                </option>
              </select>
            </div>

            <div className="col-12  ">
              <label htmlFor="password" className="form-label mb-1">
                رمز عبور
                <span className="required">*</span>
              </label>
              <input type="password" className="form-control" id="password" ref={Password_Ref} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="col-12 ">
              <label htmlFor="passwordAgain" className="form-label mb-1">
                تکرار رمز عبور
                <span className="required">*</span>
              </label>
              <input type="password" className="form-control" id="passwordAgain" ref={PasswordAgain_Ref} onChange={(e) => setPasswordAgain(e.target.value)} />
            </div>

            <div className="text-danger" id="PasswordChecklist">
              <PasswordChecklist id="PasswordChecklist" iconSize={14} messages={messages} rules={rules} minLength={8} value={password} valueAgain={passwordAgain} onChange={(isValid) => setPasswordValidation(isValid)} />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success w-50 mb-1">
                ثبت نام
              </button>

              <div>
                <p className="small fw-lighter m-0 d-inline">قبلا ثبت نام کرده اید؟</p>
                <p className="d-inline link-primary pointer " onClick={() => navigate("/login")}>
                  ورود
                </p>
              </div>

              <div className="mt-1">
                <Spinner loading={loading} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
