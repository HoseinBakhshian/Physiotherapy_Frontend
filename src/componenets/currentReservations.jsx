import React, { useEffect, useState } from "react";
import "../assets/CSS/currentReservations.css";
import { MainAxios } from "../services/MainAxios";
import CompleteSession from "./completeSession";
import { Spinner2 } from "./spinner";
const { DateObject } = require("react-multi-date-picker");
const persian = require("react-date-object/calendars/persian");
const persian_fa = require("react-date-object/locales/persian_fa");

const CurrentReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [selected, setSelected] = useState({});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadModal, setReloadModal] = useState(true);

  const date = new DateObject({ calendar: persian, locale: persian_fa });

  useEffect(() => {
    setLoading(true);
    MainAxios.get("/patients/getCurrentReservations")
      .then((res) => {
        setLoading(false);
        setReservations(res.data.currentReservations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  const handleMore = (item) => {
    setReloadModal(!reloadModal);
    setSelected(item);
  };

  return (
    <div id="inbox" >

      <div className=" mt-3 mb-2 d-flex justify-content-between align-items-center">
        <span className=" h5 fw-normal text-light mb-3 pointer" onClick={() => setReload(!reload)}>
          <i className="bi bi-arrow-clockwise"></i>
          نوبت های امروز
          <span className="h6"> ({reservations.length})</span>
        </span>
        <span className="text-light">{date.format()}</span>
      </div>

      <div id="reservationsTableWrapper" className="showScroll">
        {reservations.length == 0 ? (
          <div className=" text-center text-light h4 mt-3">موردی برای نمایش وجود ندارد </div>
        ) : (
          <table className={`table align-middle table-light table-hover table-bordered text-center  ${reservations.length == 0 ? "d-none" : ""}`}>
            <thead className="table-dark ">
              <tr>
                <th scope="col">#</th>
                <th scope="col">نام و نام خانوادگی</th>
                <th scope="col">شماره تماس</th>
                <th scope="col">ساعت </th>
                <th scope="col">بیشتر </th>
              </tr>
            </thead>
            <tbody className="table-group-divider table-responsive">
              {reservations?.map((item) => (
                <tr key={Math.random()}>
                  <th scope="row" className="counterCell"></th>
                  <td>{item.fullName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.Time}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#test"
                      onClick={() => {
                        handleMore(item);
                      }}
                    >
                      تکمیل جلسه
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className=" text-center mt-3">
        <Spinner2 loading={loading} />
      </div>

      <CompleteSession selected={selected} setReload={setReload} reloadModal={reloadModal} reload={reload} />
    </div>
  );
};

export default CurrentReservations;
