import React from "react";
import "../assets/CSS/spinner.css";

export const Spinner = (props) => {
  return (
    <>
      {props.loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};


export const Spinner2 = (props) => {
    return (
      <>
        {props.loading ? (
          <span class="loader2"></span>
        ) : (
          ""
        )}
      </>
    );
  };

