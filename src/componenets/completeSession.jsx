import React, { useContext, useEffect, useRef, useState } from "react";
import { MainAxios } from "../services/MainAxios";
import { MainContext } from "../dashboard";
import swal from "sweetalert";
import "../assets/CSS/completesession.css";
import { Spinner } from "./spinner";

const CompleteSession = (props) => {
  const { services } = useContext(MainContext);
  const [onlyNumber, setOnlyNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [isDebtor, setIsDebtor] = useState(false);
  const [loading, setLoading] = useState(false);

  const price_Ref = useRef();
  const closeBtn_Ref = useRef();
  const info_Ref = useRef();

  useEffect(() => {
    setOnlyNumber("");
    info_Ref.current.value = "";
    setIsDebtor(false);
    setSelectedServices([]);
  }, [props.reloadModal]);

  const handlebtn = (e) => {
    e.preventDefault();

    for (let e of selectedServices) {
      console.log(e);
    }
    swal({
      title: "نوبت تکمیل شود؟",
      text: "در صورت تکمیل کردن امکان بازگشت وجود ندارد",
      icon: "warning",
      buttons: ["بیخیال", "اکی"],
    }).then((complete) => {
      if (complete) {
        if (selectedServices.length == 0) {
          swal({
            title: "هیچ سرویسی انتخاب نشده است",
            icon: "error",
          });
        } else {
          const data = {
            reservationID: props.selected._id,
            selectedServices: selectedServices,
            Price: price_Ref.current.value,
            isDebtor: isDebtor,
            info: info_Ref.current.value,
          };
          setLoading(true);
          MainAxios.post("/patients/completeReservation", data)
            .then((res) => {
              setLoading(false);
              closeBtn_Ref.current.click();
              if (res.status == 200) {
                swal({
                  title: res.data.mess,
                  icon: "success",
                });
                props.setReload(!props.reload);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    });
  };

  const handleDebt = (e) => {
    setIsDebtor(!isDebtor);
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedServices([...selectedServices, value]);
    } else {
      setSelectedServices(selectedServices.filter((item) => item != value));
    }
  };

  const inputRestriction = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setOnlyNumber(numericValue);
  };

  const handleCancel = () => {
    swal({
      title: "نوبت کنسل شود؟",
      text: "در صورت کنسل کردن امکان بازگشت وجود ندارد",
      icon: "warning",
      buttons: ["بیخیال", "اکی"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);
        MainAxios.delete(`/patients/cancellReservation/${props.selected._id}`)
          .then((res) => {
            setLoading(false);
            closeBtn_Ref.current.click();
            if (res.status == 200) {
              swal({
                title: res.data.mess,
                icon: "success",
              });
              props.setReload(!props.reload);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="modal fade" id="test" tabIndex="-1" aria-labelledby="test" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-body ">
            <div className="d-flex justify-content-between">
              <legend className=" h4 fw-normal text-success mb-0"> تکمیل جلسه</legend>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtn_Ref}></button>
            </div>
            <hr className="mt-2" />

            <form className="row gy-3" onSubmit={handlebtn}>
              <div className="col-6">
                <span className="fw-bold">بیمار:</span> {props.selected.fullName}
              </div>

              <div className="col-6">
                <span className="fw-bold">کدملی:</span> {props.selected.nationalID}
              </div>

              <div className="col-12 ">
                <span className="fw-bold">خدمات</span>
                <div className="row" dir="ltr">
                  {services.map((item, index) => (
                    <div className="col-6" key={Math.random()}>
                      <div className="form-check">
                        <label className="form-check-label font-custom1" htmlFor={index}>
                          {item}
                        </label>

                        <input className="form-check-input" name="item" type="checkbox" id={index} onChange={handleCheckbox} value={item} checked={selectedServices.includes(item)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="price" className="form-label mb-1 fw-bold">
                  مبلغ
                </label>

                <div className="input-group" dir="ltr">
                  <span className="input-group-text" id="price_prefix">
                    تومان
                  </span>
                  <input type="text" className="form-control" id="price" aria-label="price" aria-describedby="price_prefix" autoComplete="off" ref={price_Ref} onChange={inputRestriction} value={onlyNumber} required />
                </div>

                <label htmlFor="debt" className="form-label mt-1">
                  <div className="form-check form-switch d-inline p-0">
                    <input className="form-check-input " type="checkbox" id="flexSwitchCheckDisabled" onChange={handleDebt} checked={isDebtor} />
                  </div>
                  <span className="opacity-75">بدهکار</span>
                </label>
              </div>

              <div className="col-12">
                <label htmlFor="info" className="form-label mb-1 fw-bold">
                  توضیحات
                </label>
                <textarea className="form-control" id="info" ref={info_Ref}></textarea>
              </div>

              <div className="col-12">
                <div className="row text-center justify-content-evenly">
                  <button type="submit" className="col-4 btn btn-success ">
                    تکمیل اطلاعات
                  </button>

                  <button type="button" className="col-4 btn btn-danger " onClick={handleCancel}>
                    کنسل نوبت
                  </button>
                </div>
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
};

export default CompleteSession;
