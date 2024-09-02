import { useContext, useEffect, useRef, useState } from "react";
import { MainAxios } from "../services/MainAxios";
import More from "./more";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "../assets/CSS/archive.css";
import { MainContext } from "../dashboard";
import { redirect, useNavigate } from "react-router-dom";
import { Spinner, Spinner2 } from "./spinner";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

let defaultData = {
  nationalID: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  Date: "",
  Time: "",
  Services: [],
  Price: "",
  paymentDate: "76767",
  Info: "",
};

const Archive = () => {
  const [table, setTable] = useState([]);
  const [lastSelectedFilter, setLastSelectedFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(defaultData);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const search_Ref = useRef();

  const getArchive = (e) => {
    let min;
    let max;
    let search = search_Ref.current.value.trim().replace(/\s+/g, " ");
    if (dates[0] == undefined) {
      min = "";
      max = "";
    } else if (dates[1] == undefined) {
      min = dates[0].toString();
      max = dates[0].toString();
    } else {
      min = dates[0].toString();
      max = dates[1].toString();
    }
    setLoading(true);
    MainAxios.get(`/patients/getArchive?min=${min}&max=${max}&search=${search}`)
      .then((res) => {
        setLoading(false);
        setTable(res.data.archive);
        setLastSelectedFilter("getArchive");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllReservations = (e) => {
    let min;
    let max;
    let search = search_Ref.current.value.trim().replace(/\s+/g, " ");
    if (dates[0] == undefined) {
      min = "";
      max = "";
    } else if (dates[1] == undefined) {
      min = dates[0].toString();
      max = dates[0].toString();
    } else {
      min = dates[0].toString();
      max = dates[1].toString();
    }

    setLoading(true);
    MainAxios.get(`/patients/getAllReservations?min=${min}&max=${max}&search=${search}`)
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setTable(res.data.reservation);
          setLastSelectedFilter("getAllReservations");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDebtors = (e) => {
    let min;
    let max;
    let search = search_Ref.current.value.trim().replace(/\s+/g, " ");
    if (dates[0] == undefined) {
      min = "";
      max = "";
    } else if (dates[1] == undefined) {
      min = dates[0].toString();
      max = dates[0].toString();
    } else {
      min = dates[0].toString();
      max = dates[1].toString();
    }
    setLoading(true);
    MainAxios.get(`/patients/getDebtors?min=${min}&max=${max}&search=${search}`)
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setTable(res.data.debtor);
          setLastSelectedFilter("getDebtors");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCancelled = (e) => {
    let min;
    let max;
    let search = search_Ref.current.value.trim().replace(/\s+/g, " ");
    if (dates[0] == undefined) {
      min = "";
      max = "";
    } else if (dates[1] == undefined) {
      min = dates[0].toString();
      max = dates[0].toString();
    } else {
      min = dates[0].toString();
      max = dates[1].toString();
    }
    setLoading(true);
    MainAxios.get(`/patients/getCancelledReservations?min=${min}&max=${max}&search=${search}`)
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setTable(res.data.cancelled);
          setLastSelectedFilter("getCancelled");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMore = (item) => {
    setSelectedItem(item);
  };

  return (
    <div id="archive">
      <div className="container mt-5">
        <div className="row justify-content-center mb-3">
          <div className="row justify-content-center col-12">
            <div className="col-12 col-md-8 col-lg-5 m-2">
              <div className="input-group" dir="ltr">
                <span className="input-group-text" id="price_prefix">
                  <i className="bi bi-person-bounding-box fs-5"></i>
                </span>
                <input type="text" className="form-control" id="price" aria-label="price" aria-describedby="price_prefix" autoComplete="off" required ref={search_Ref} placeholder="  نام و نام خانوادگی یا کدملی" dir="rtl" />
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-5 m-2">
              <DatePicker
                containerStyle={{
                  width: "100%",
                }}
                id
                render={(value, openCalendar) => {
                  return (
                    <div className="input-group" dir="ltr">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-calendar4-week fs-5"></i>
                      </span>
                      <input type="text" className="form-control " onClick={openCalendar} value={value} onChange={()=>("")} aria-describedby="basic-addon1" dir="rtl" />
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
                weekDays={weekDays}
                calendar={persian}
                locale={persian_fa}
                dateSeparator=" تا "
                value={dates}
                calendarPosition="bottom-left"
                onChange={(dateObjects) => setDates(dateObjects)}
              >
                <button className=" mb-3 " onClick={() => setDates([undefined])}>
                  لغو انتخاب
                </button>
              </DatePicker>
            </div>

            {/* <div className="col-10 col-md-8 col-lg-5 m-2">
              <select className="form-select" aria-label="Default select example">
                <option selected >انتخاب نوع نوبت ها </option>
                <option value="1"> تکمیل شده ها</option>
                <option value="2"> نوبت ها</option>
                <option value="3"> کنسل شده ها</option>
              </select>
            </div> */}
          </div>

          <div className="row justify-content-center col-12">
            <button className={`col-4 col-md-2 rounded border-0 m-2 p-1 custom-hover ${lastSelectedFilter == "getArchive" ? "selected-filter" : ""}`} onClick={getArchive}>
              تکمیل شده
            </button>
            <button className={`col-4 col-md-2 rounded border-0 m-2 p-1 custom-hover ${lastSelectedFilter == "getAllReservations" ? "selected-filter" : ""}`} onClick={getAllReservations}>
              رزرو شده
            </button>
            <button className={`col-4 col-md-2 rounded border-0 m-2 p-1 custom-hover ${lastSelectedFilter == "getDebtors" ? "selected-filter" : ""}`} onClick={getDebtors}>
              تصویه نشده
            </button>
            <button className={`col-4 col-md-2 rounded border-0 m-2 p-1 custom-hover ${lastSelectedFilter == "getCancelled" ? "selected-filter" : ""}`} onClick={getCancelled}>
              کنسل شده
            </button>
          </div>

          {/* <button className={`col-4 col-md-2 rounded  border-0 m-2 p-1 custom-hover ${lastSelectedFilter == "getPatientsFiles" ? "selected-filter" : ""}`} onClick={getPatientsFiles}>
            پرونده ها
          </button> */}

          {/* <div className="d-flex justify-content-center text-light rounded mt-2">
            <div class="form-check m-2">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label class="form-check-label" for="flexRadioDefault1">
                تکمیل شده ها
              </label>
            </div>
            <div class="form-check m-2">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
              <label class="form-check-label" for="flexRadioDefault2">
                بدهکار ها
              </label>
            </div>

            <div class="form-check m-2">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
              <label class="form-check-label" for="flexRadioDefault2">
                کنسل شده ها
              </label>
            </div>

            <div class="form-check m-2">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
              <label class="form-check-label" for="flexRadioDefault2">
                نوبت ها
              </label>
            </div>
          </div> */}

          <button className="btn btn bg-success col-3 col-md-2 text-light mt-1">
            <span>جستجو</span>
          </button>
        </div>

        <div id="tableWrapper" className="border-top pt-4">
          {table.length == 0 ? (
            <div className=" text-center text-light h4 mt-3">موردی برای نمایش وجود ندارد </div>
          ) : (
            <table className={`table align-middle table-light table-hover table-bordered text-center mb-5 ${lastSelectedFilter == "getPatientsFiles" ? "d-none" : ""}`}>
              <thead className="table-dark ">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">نام و نام خانوادگی</th>
                  <th scope="col">تاریخ </th>
                  <th scope="col"> زمان </th>
                  <th scope="col">بیشتر </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {table?.map((item) => (
                  <tr key={Math.random()}>
                    <th scope="row" className="counterCell"></th>
                    <td>{item.fullName}</td>
                    <td>{item.Date}</td>
                    <td>{item.Time}</td>
                    <td>
                      <i className="bi bi-info-circle-fill" id="more" data-bs-toggle="modal" data-bs-target="#archiveTableMore" onClick={() => handleMore(item)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="col-12 text-center mt-3">
          <Spinner2 loading={loading} />
        </div>

        <More selectedItem={selectedItem} lastSelectedFilter={lastSelectedFilter} />
      </div>
    </div>
  );
};

export default Archive;
