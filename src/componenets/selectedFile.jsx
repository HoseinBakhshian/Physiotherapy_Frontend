import { useLocation } from "react-router-dom";

function SelectedFile() {
  const location = useLocation();
  return (
    <div>
      <div className="container mt-5 ">
        <div className="row  justify-content-center m-2">
          <div className="col-12 col-md-9 col-lg-7 row bg-light rounded p-2 ">

            <div className="col-6 p-2 border-start border-bottom">
              <label htmlFor="fullName" className=" opacity-75">
                نام و نام خانوادگی
              </label>
              <div className="fw-bold">{location.state.fullName}</div>
            </div>

            <div className="col-6 p-2 border-bottom">
              <label htmlFor="nationalID" className=" opacity-75">
                کدملی
              </label>
              <div className="fw-bold">{location.state.nationalID}</div>
            </div>

            <div className="col-6 p-2 border-start border-bottom">
              <label htmlFor="nationalID" className=" opacity-75">
                تاریخ تولد
              </label>
              <div className="fw-bold">{location.state.birthDate}</div>
            </div>

            <div className="col-6 p-2 border-bottom">
              <label htmlFor="nationalID" className=" opacity-75">
                شماره تماس
              </label>
              <div className="fw-bold">{location.state.phoneNumber}</div>
            </div>

            <div className="col-6 p-2 border-start border-bottom">
              <label htmlFor="nationalID" className=" opacity-75">
                ارزیاب
              </label>
              <div className="fw-bold">{location.state.assesor}</div>
            </div>

            <div className="col-6 p-2 border-bottom">
              <label htmlFor="nationalID" className=" opacity-75">
                تاریخ ارزیابی
              </label>
              <div className="fw-bold">{location.state.assesmentDate}</div>
            </div>

            <div className="col-6 p-2 border-start border-bottom">
              <label htmlFor="nationalID" className=" opacity-75">
                وضعیت
              </label>
              <div className="fw-bold">{location.state.situation}</div>
            </div>

            <div className="col-12 p-2 ">
              <label htmlFor="nationalID" className=" opacity-75">
                ارزیابی
              </label>
              <div className="fw-bold">{location.state.assesment}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedFile;
