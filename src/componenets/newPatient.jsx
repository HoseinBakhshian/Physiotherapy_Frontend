import React, { useContext, useEffect, useRef, useState } from "react";
import { MainAxios } from "../services/MainAxios";
import swal from "sweetalert";
import { MainContext } from "../dashboard";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import "../assets/CSS/newPatient.css";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const NewPatient = () => {
  const { employees } = useContext(MainContext);

  const [onlyNumber1, setOnlyNumber1] = useState("");
  const [onlyNumber2, setOnlyNumber2] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const fullName_Ref = useRef();
  const nationalID_Ref = useRef();
  const phoneNumber_Ref = useRef();
  const assesor_Ref = useRef();
  const prescription_Ref = useRef();


  useEffect(() => {

  }, []);

  const handlebtn = (e) => {
    e.preventDefault();

    let user = {
      nationalID: nationalID_Ref.current.value || "",
      fullName: fullName_Ref.current.value || "",
      phoneNumber: phoneNumber_Ref.current.value || "",
      birthDate: value.toString() || "",
      assesor: assesor_Ref.current.value || "",
      assesment: prescription_Ref.current.value || "",
      situation: "1",
    };

    setLoading(true);
    MainAxios.post("/patients/newPatient", user)
      .then((res) => {
        if (res.status == 200) {
          setLoading(false);
          swal({
            title: res.data.mess,
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputRestriction1 = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setOnlyNumber1(numericValue);
  };

  const inputRestriction2 = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setOnlyNumber2(numericValue);
  };

  return (
    <div id="newPatient">
      <div className="row justify-content-center align-items-baseline mb-5">
        <div className="col-11 col-md-9 col-lg-5  text-bg-light mt-5 rounded-3  shadow border border-1 p-3">
          
          <div>
            <legend className=" h4 fw-normal text-success mb-2">بیمار جدید</legend>
            <hr className="mb-0" />
          </div>

          <form className="row justify-content-between gy-3" onSubmit={handlebtn}>
            <div className="col-12 ">
              <label htmlFor="firstname" className="form-label mb-1">
                نام و نام خانوادگی
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="firstname" id="firstname" ref={fullName_Ref} autoComplete="off" required />
            </div>

            <div className="col-6">
              <label htmlFor="nationalID" className="form-label mb-1">
                کدملی
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control " name="nationalID" id="nationalID" ref={nationalID_Ref} onChange={inputRestriction1} autoComplete="off" value={onlyNumber1} required />
            </div>

            <div className="col-6">
              <label htmlFor="phoneNumber" className="form-label mb-1">
                شماره تماس
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="phoneNumber" id="phoneNumber" ref={phoneNumber_Ref} onChange={inputRestriction2} autoComplete="off" value={onlyNumber2} required />
            </div>

            <div className="col-6">
              <label htmlFor="assesor" className="form-label mb-1">
                ارزیاب
                <span className="required">*</span>
              </label>
              <select id="assesor" className="form-select" ref={assesor_Ref}>
                {employees.map((item) => (
                  <option key={Math.random()}>{item} </option>
                ))}
              </select>
            </div>

            <div className="col-6">
              <label htmlFor="birthDate" className="form-label mb-1">
                تاریخ تولد
                <span className="required">*</span>
              </label>
              <DatePicker
                containerStyle={{
                  width: "100%",
                }}
                render={(value, openCalendar) => {
                  return (
                    <div className="input-group mb-3" dir="ltr">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-calendar4-week"></i>
                      </span>
                      <input type="text" className="form-control" onClick={openCalendar} value={value} onChange={()=>("")} aria-describedby="basic-addon1" required/>
                    </div>
                  );
                }}
                mapDays={({ date }) => {
                  let props = {};
                  let isWeekend = date.weekDay.index === 6;
                  if (isWeekend) props.className = "highlight highlight-red";
                  return props;
                }}
                monthYearSeparator="|"
                animations={[transition()]}
                maxDate={new DateObject({ calendar: persian })}
                calendar={persian}
                weekDays={weekDays}
                locale={persian_fa}
                value={value}
                onChange={setValue}
                calendarPosition="bottom-left"
              />
            </div>

            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="prescription" className="form-label">
                  تشخیص
                </label>
                <textarea className="form-control" id="prescription" placeholder="لطفا شرح حال بیمار را شرح دهید" ref={prescription_Ref} required></textarea>
              </div>
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success w-50 mb-1">
                ثبت بیمار جدید
              </button>
            </div>

            {loading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              ""
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPatient;
