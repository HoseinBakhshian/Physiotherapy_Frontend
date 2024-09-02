import { useEffect, useRef, useState } from "react";
import { MainAxios } from "../services/MainAxios";
import swal from "sweetalert";
import "../assets/CSS/more.css";
import { Spinner, Spinner2 } from "./spinner";

function More(props) {
  const [loading, setLoading] = useState(false);

  const closeBtn_Ref = useRef();

  useEffect(() => {}, [props.selectedItem]);

  const handlePaid = () => {
    swal({
      title: "حساب تصویه شود؟",
      icon: "warning",
      buttons: ["بیخیال", "تصویه"],
      dangerMode: true,
    }).then((isPaid) => {
      if (isPaid) {
        setLoading(true);
        MainAxios.delete(`/patients/payBill/${props.selectedItem._id}`)
          .then((res) => {
            setLoading(false);

            closeBtn_Ref.current.click();
            if (res.status == 200) {
              swal({
                title: res.data.mess,
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="modal fade" id="archiveTableMore" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-body mt-0">
            <div className="d-flex justify-content-between">
              <legend className=" h4 fw-normal text-success mb-0">بیشتر </legend>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtn_Ref}></button>
            </div>

            <div className="p-3 mt-1 ">
              <div className="row justify-content-between border  rounded">
                <div className="col-6 border-start border-bottom p-2">
                  <label htmlFor="nationalID" className=" opacity-75">
                    کدملی
                  </label>
                  <div className="fw-bold">{props.selectedItem.nationalID}</div>
                </div>

                <div className="col-6 border-bottom p-2">
                  <label htmlFor="fullName" className=" opacity-75">
                    نام و نام خانوادگی
                  </label>
                  <div className="fw-bold">{props.selectedItem.fullName}</div>
                </div>

                <div className="col-6 border-start p-2">
                  <label htmlFor="date" className="opacity-75 ">
                    شماره تماس
                  </label>
                  <div className="fw-bold">{props.selectedItem.phoneNumber}</div>
                </div>

                <div className="col-6   p-2">
                  <label htmlFor="time" className="opacity-75 ">
                    تاریخ و زمان
                  </label>
                  <div className="fw-bold">
                    {props.selectedItem.Time} {props.selectedItem.Date}
                  </div>
                </div>
              </div>
            </div>

            {props.lastSelectedFilter == "getArchive" ? (
              <div className="p-3 mt-1 ">
                <div className="row justify-content-between border  rounded">
                  <div className="col-12 border-bottom  p-2">
                    <label htmlFor="nationalID" className=" opacity-75">
                      خدمات ارائه شده
                    </label>
                    <div>
                      <ul dir="ltr" className="row row-cols-1 row-cols-md-2">
                        {props.selectedItem.Services?.map((item) => (
                          <li key={Math.random()} className="font-custom1 fw-semibold">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="col-6 border-bottom border-start p-2">
                    <label htmlFor="fullName" className=" opacity-75">
                      مبلغ
                    </label>
                    <div className="fw-bold">{props.selectedItem.Price}</div>
                  </div>

                  {props.lastSelectedFilter == "getArchive" ? (
                    <div className="col-6  border-bottom p-2">
                      <label htmlFor="time" className="opacity-75 ">
                        تاریخ پرداخت
                      </label>
                      <div className="fw-bold">{props.selectedItem.paymentDate || "روز جلسه"}</div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="col-6  p-2">
                    <label htmlFor="date" className="opacity-75 ">
                      یادداشت
                    </label>
                    <div className="fw-bold">{props.selectedItem.Info}</div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {props.lastSelectedFilter == "getDebtors" ? (
              <div className="p-3 pb-0 mt-1">
                <div className="row justify-content-between border  rounded">
                  <div className="col-12 border-bottom p-2">
                    <label htmlFor="nationalID" className=" opacity-75">
                      خدمات ارائه شده
                    </label>
                    <div className="fw-bold">
                      <ul>
                        {props.selectedItem.Services?.map((item) => (
                          <li key={Math.random()} className="font-custom1 fw-semibold">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="col-6  border-start p-2">
                    <label htmlFor="fullName" className=" opacity-75">
                      مبلغ
                    </label>
                    <div className="fw-bold">{props.selectedItem.Price}</div>
                  </div>

                  <div className="col-6  p-2">
                    <label htmlFor="date" className="opacity-75 ">
                      یادداشت
                    </label>
                    <div className="fw-bold">{props.selectedItem.Info}</div>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <button type="button" className="btn btn-sm btn-success" onClick={handlePaid}>
                    تصویه شد
                  </button>

                  <div className="col-12 text-center mt-3">
                    <Spinner loading={loading} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default More;
