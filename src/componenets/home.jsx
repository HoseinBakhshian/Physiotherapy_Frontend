import React, { useContext, useEffect, useState } from "react";
import NewReservation from "../componenets/NewReservation";
import CurrentReservations from "./currentReservations";


const Home = () => {
  const [reloadModal, setReloadModal] = useState(true);

  useEffect(() => {

    
  }, []);
  


  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-5 ">
        <button type="button" className="btn btn-sm btn-success d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#newReservation" onClick={()=> setReloadModal(!reloadModal)}>
          <i className="bi bi-plus p-0 fs-5 "></i>
          <span className="h6 p-0  mb-0 ">نوبت جدید</span>
        </button>
      </div>

      <NewReservation reloadModal={reloadModal}/>
      <CurrentReservations />
    </div>
  );
};

export default Home;
