import { useEffect, useRef, useState } from "react";
import { MainAxios } from "../services/MainAxios";
import { useNavigate } from "react-router-dom";
import { Spinner2 } from "./spinner";

function Files() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const search_Ref = useRef();

  const Navigate = useNavigate();

  useEffect(() => {}, []);

  const getPatientsFiles = (e) => {
    e.preventDefault();

    let search = search_Ref.current.value.trim().replace(/\s+/g, " ");
    setLoading(true);

    MainAxios.get(`/patients/getPatientsFiles?search=${search}`)
      .then((res) => {
        setLoading(false);

        setFiles(res.data.Files);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center mb-5">
          <div className="col-10 col-md-8 col-lg-5 mb-4">
            <form onSubmit={getPatientsFiles} className="row justify-content-center">
              <div className="input-group" dir="ltr">
                <span className="input-group-text" id="price_prefix">
                  <i className="bi bi-person-bounding-box fs-5"></i>
                </span>
                <input type="text" className="form-control " ref={search_Ref} aria-label="price" aria-describedby="price_prefix" autoComplete="off" required placeholder="جستجوی پرونده با نام و نام خانوادگی یا کدملی" dir="rtl" />
              </div>

              <button type="submit" className="btn btn bg-success col-3 col-md-2 text-light mt-2">
                <span>جستجو</span>
              </button>
            </form>

            <div className="col-12 text-center mt-3">
              <Spinner2 loading={loading} />
            </div>
          </div>

          {files.length == 0 ? (
            <div className=" text-center text-light h5 mt-2">پرونده ای برای نمایش وجود ندارد </div>
          ) : (
            <div className="col-12 row justify-content-center ">
              {files?.map((item) => (
                <div key={Math.random()} className="col-12 col-md-9 col-lg-5 row bg-light rounded m-1">
                  <div className="col-6 p-2">
                    <label htmlFor="fullName" className=" opacity-75">
                      نام و نام خانوادگی
                    </label>
                    <div className="fw-bold">{item.fullName}</div>
                  </div>

                  <div className="col-5 p-2">
                    <label htmlFor="nationalID" className=" opacity-75">
                      تاریخ ارزیابی
                    </label>
                    <div className="fw-bold">{item.assesmentDate}</div>
                  </div>

                  <div className="col-1 align-content-center" onClick={() => Navigate("/files/selectedfile", { state: item })}>
                    <i className="bi bi-three-dots-vertical fs-4 pointer custom-hover1"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Files;
