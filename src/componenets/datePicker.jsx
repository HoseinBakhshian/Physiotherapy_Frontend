import React, { useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const Date_Picker1 = () => {
  const [value, setValue] = useState("");
  const [values, setValues] = useState([new DateObject({ calendar: persian }).subtract(4, "days"), new DateObject({ calendar: persian }).add(4, "days")]);

  // console.log(value.toString());
  // console.log(test.current.value);
  // const date = new DateObject({ calendar: persian, locale: persian_fa });
  // const { year, month, day, hour, minute } = date;
  // console.log(date.format());

  return (
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
            <input type="text" className="form-control" onClick={openCalendar} value={value} aria-describedby="basic-addon1" />
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
  );
};

const Date_Picker2 = () => {
  const [value, setValue] = useState("");
  const [values, setValues] = useState([new DateObject({ calendar: persian }).subtract(4, "days"), new DateObject({ calendar: persian }).add(4, "days")]);

  // console.log(value.toString());
  const date = new DateObject({ calendar: persian, locale: persian_fa });
  // const { year, month, day, hour, minute } = date;
  // console.log(date.format());

  return (
    <DatePicker
      containerStyle={{
        width: "100%",
      }}
      render={(value, openCalendar) => {
        return (
          <div claclassNamess="input-group mb-3" dir="ltr">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-calendar4-week"></i>
            </span>
            <input type="text" className="form-control" onClick={openCalendar} value={value} aria-describedby="basic-addon1" />
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
      minDate={new DateObject({ calendar: persian })}
      calendar={persian}
      weekDays={weekDays}
      locale={persian_fa}
      value={value}
      onChange={setValue}
      calendarPosition="bottom-left"
    />
  );
};
export { Date_Picker1, Date_Picker2 };
