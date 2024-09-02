import { useContext, useEffect, useRef, useState } from "react";
import { MainAxios } from "../services/MainAxios";
import { MainContext } from "../dashboard";
import swal from "sweetalert";
import "../assets/CSS/setting.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./spinner";

const Setting = () => {
  const { employees, services, reload, setReload, accountInfo } = useContext(MainContext);
  const [loading, setLoading] = useState(false);

  const service_Ref = useRef();
  const employee_Ref = useRef();

  const navigate = useNavigate();

  useEffect(() => {}, [reload]);

  const handleNewService = (e) => {
    if (service_Ref.current.value != "") {
      let data = {
        newService: service_Ref.current.value,
      };
      setLoading(true);
      MainAxios.put("/clinic/setNewService", data)
        .then((res) => {
          if (res.status == 200) {
            setLoading(false);
            swal({
              title: res.data.mess,
              icon: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      service_Ref.current.style.border = "1px solid red";
    }
  };

  const handleNewEmployee = (e) => {
    if (employee_Ref.current.value != "") {
      let data = {
        newEmployee: employee_Ref.current.value,
      };
      setLoading(true);
      MainAxios.put("/clinic/setNewEmployee", data)
        .then((res) => {
          if (res.status == 200) {
            setLoading(false);
            swal({
              title: res.data.mess,
              icon: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      employee_Ref.current.style.border = "1px solid red";
    }
  };

  const handleDropService = (e) => {
    if (service_Ref.current.value != "") {
      let data = {
        Service: service_Ref.current.value,
      };
      setLoading(true);
      MainAxios.put("/clinic/deleteService", data)
        .then((res) => {
          if (res.status == 200) {
            setLoading(false);
            swal({
              title: res.data.mess,
              icon: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      service_Ref.current.style.border = "1px solid red";
    }
  };

  const handleDropEmployee = (e) => {
    if (employee_Ref.current.value != "") {
      let data = {
        Employee: employee_Ref.current.value,
      };
      setLoading(true);
      MainAxios.put("/clinic/deleteEmployee", data)
        .then((res) => {
          if (res.status == 200) {
            setLoading(false);
            swal({
              title: res.data.mess,
              icon: "success",
            });
            setReload(!reload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      employee_Ref.current.style.border = "1px solid red";
    }
  };

  const handleLogOut = () => {
    swal({
      title: "میخواهید از حساب خارج شوید",
      icon: "warning",
      buttons: ["بیخیال", "بله"],
      dangerMode: true,
    }).then((logout) => {
      if (logout) {
        setLoading(true);
        MainAxios.get("/user/logout")
          .then((res) => {
            setLoading(false);
            if (res.status == 200) {
              if (res.data.logout == true) {
                navigate("/login");
                swal({
                  title: res.data.mess,
                  icon: "success",
                });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div id="setting" className=" mb-5 mt-5">
      <div className=" container ">
        <div className="row justify-content-center">
          <div className="col-11 row  justify-content-between">
            <div className="col-12 mt-1">
              <div className="row mb-3  p-3  text-bg-light rounded-3 shadow">
                <div className="col-12">
                  <legend className=" h4 fw-normal text-success mb-2"> اطلاعات حساب </legend>
                  <hr className="mb-2" />
                </div>

                <div className="col-12 col-md-6 text-center  p-2">
                  <label htmlFor="username" className="opacity-75 ms-2">
                    نام کاربری
                  </label>
                  <span className="fw-bold font-custom1 h5">{accountInfo.userName}</span>
                </div>

                <div className="col-12 col-md-6 text-center p-2">
                  <label htmlFor="role" className="opacity-75 ms-2">
                    نقش
                  </label>
                  <span className="fw-bold  h5">{accountInfo.Role == "admin" ? "ادمین" : "کارمند"}</span>
                </div>

                <div className="col-12  text-center p-2">
                  <button type="button" className="btn btn-danger p-1 ps-3 pe-3" onClick={handleLogOut}>
                    خروج از حساب
                  </button>
                </div>
              </div>

              <div className="row p-3 pb-3 text-bg-light rounded-3 shadow">

                <div className="col-12">
                  <legend className=" h4 fw-normal text-success mb-2">اطلاعات کلینیک </legend>
                  <hr className="mb-3" />
                </div>

                <div className="col-12 col-lg-6">
                  <label className=" mb-1">تشخیص دهندگان</label>
                  <ul dir="rtl" className="row row-cols-1 row-cols-md-2">
                    {employees?.map((item) => (
                      <li key={Math.random()} className="font-custom2 fw-semibold h6">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-12 col-lg-6">
                  <label className=" mb-1"> سرویس ها</label>
                  <ul dir="ltr" className="row row-cols-1 row-cols-md-2">
                    {services?.map((item) => (
                      <li key={Math.random()} className="font-custom1 fw-semibold">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {accountInfo.Role == "admin" ? (
                  <div className="row gy-3">
                    <div className="col-12">
                      <label htmlFor="service" className="form-label mb-1">
                        سرویس
                        <span className="required">*</span>
                      </label>
                      <form className="row">
                        <div className="col-12 col-md-5 mb-2 p-0 ms-3">
                          <input type="text" className="form-control" id="service" required ref={service_Ref} autoComplete="off" />
                        </div>

                        <div className=" col-4 ms-2">
                          <i className="bi bi-plus-circle-fill text-success fs-4 pointer ms-4" onClick={handleNewService}></i>
                          <i className="bi bi-trash3-fill text-danger fs-4 pointer" onClick={handleDropService}></i>
                        </div>
                      </form>
                    </div>

                    <div className="col-12">
                      <label htmlFor="assesor" className="form-label mb-1">
                        تشخیص دهنده
                        <span className="required">*</span>
                      </label>
                      <form className="row">
                        <div className="col-12 col-md-5 mb-2 p-0  ms-3">
                          <input type="text" className="form-control" id="assesor" required ref={employee_Ref} autoComplete="off" />
                        </div>

                        <div className="col-4  ms-2">
                          <i className="bi bi-plus-circle-fill text-success fs-4 pointer ms-4" onClick={handleNewEmployee}></i>
                          <i className="bi bi-trash3-fill text-danger fs-4 pointer" onClick={handleDropEmployee}></i>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="col-12 text-center mt-3">
                  <Spinner loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
