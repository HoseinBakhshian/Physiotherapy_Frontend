import React, { useEffect, useRef, useState } from "react";
import { MainAxios } from "../services/MainAxios";
import swal from "sweetalert";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import { ToastContainer, toast } from "react-toastify";
import "../assets/CSS/ReactToastify.css";
import { Spinner } from "./spinner";
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function NewReservation(props) {
  const [onlyNumber, setOnlyNumber] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const nationalID_Ref = useRef();
  const time_Ref = useRef();
  const closeBtn_Ref = useRef();
  const modal_Ref = useRef();

  useEffect(() => {
    time_Ref.current.value = "";
    setOnlyNumber("")
    setValue("")

  }, [props.reloadModal]);

  const handlebtn = (e) => {
    e.preventDefault();

    let newReservation = {
      nationalID: nationalID_Ref.current.value,
      Date: value.toString(),
      Time: time_Ref.current.value,
    };

    try {
      setLoading(true);
      MainAxios.get(`/patients/getOnePatient/${newReservation.nationalID}`).then((res) => {
        setLoading(false);
        if (res.status == 200) {
          if (res.data.isValid == true) {
            swal({
              title: `نوبت برای ${res.data.patient.fullName} اضافه شود؟`,
              buttons: ["بیخیال", "افزودن"],
            }).then((addThis) => {
              if (addThis) {
                setLoading(true);
                MainAxios.post("/patients/newReservation", newReservation).then((res) => {
                  setLoading(false);
                  closeBtn_Ref.current.click();
                  if (res.status == 200) {
                    swal({
                      title: res.data.mess,
                      icon: "success",
                    });
                  }
                });
              }
            });
          } else {
            swal({
              title: res.data.mess,
              icon: "error",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const inputRestriction = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setOnlyNumber(numericValue);
  };

  return (
    <div className={"modal fade"} id="newReservation" tabIndex="-1" aria-hidden="true" ref={modal_Ref}>
      <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-body mt-0">
            <div className="d-flex justify-content-between">
              <legend className=" h4 fw-normal text-success mb-0">نوبت جدید</legend>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtn_Ref}></button>
            </div>

            <hr className="mt-2" />

            <form className="row justify-content-between gy-3" id="newReservationForm" onSubmit={handlebtn}>
              <div className="col-12">
                <label htmlFor="nationalID" className="form-label mb-1">
                  کدملی
                  <span className="required">*</span>
                </label>
                <input type="text" className="form-control" ref={nationalID_Ref} onChange={inputRestriction} value={onlyNumber} />
              </div>

              <div className="col-6">
                <label htmlFor="date" className="form-label mb-1">
                  تاریخ
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
                        <input type="text"  className="form-control" onClick={openCalendar} value={value}  onChange={()=>("")} aria-describedby="basic-addon1"   required/>
                      </div>
                    );
                  }}

                  // render={(value, openCalendar) => {
                  //   return (
                  //     <div className="input-group mb-3" dir="ltr">
                  //       <span className="input-group-text" id="basic-addon1">
                  //         <i className="bi bi-calendar4-week"></i>
                  //       </span>
                  //       <p  className="form-control" onClick={openCalendar} value={value || ""} aria-describedby="basic-addon1" required />
                  //     </div>
                  //   );
                  // }}


                  mapDays={({ date }) => {
                    let props = {};
                    let isWeekend = date.weekDay.index === 6;
                    if (isWeekend) props.className = "highlight highlight-red";
                    return props;
                  }}
                  monthYearSeparator="|"
                  animations={[transition()]}
                  minDate={new DateObject({ calendar: persian })}
                  calendar={persian}
                  weekDays={weekDays}
                  locale={persian_fa}
                  value={value}
                  onChange={setValue}
                  calendarPosition="bottom-left"
                />
              </div>

              <div className="col-6">
                <label htmlFor="time" className="form-label mb-1">
                  ساعت
                  <span className="required">*</span>
                </label>
                <input ref={time_Ref} type="time" className="form-control" required />
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="btn btn-success w-50">
                  ثبت نوبت جدید
                </button>
              </div>

              <div className="col-12 text-center">
                <Spinner loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewReservation;
