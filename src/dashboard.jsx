import { useNavigate } from "react-router-dom";
import "./assets/CSS/dashboard.css";
import Header from "./componenets/header";
import Offcanvas from "./componenets/offcanvas";
import { Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { MainAxios } from "./services/MainAxios";

export const MainContext = createContext({});

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [login, setLogin] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      MainAxios.get("/user/authCheck")
        .then((res) => {
            console.log("useeefect");
          if (res.data.authenticated) {
            setAccountInfo(res.data.Info);
            setLogin(true);
          } else {
            console.log("loggiiin");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {

      MainAxios.get("/clinic/getServices").then((res) => {
        if (res.status == 200) {
          setServices(res.data.Services);
        }
      });

      MainAxios.get("/clinic/getEmployees").then((res) => {
        if (res.status == 200) {
          setEmployees(res.data.Employees);
        }
      });
    }
  }, [reload, login]);

  if (login) {
    return (
      <div id="dashboard">
        <MainContext.Provider value={{ employees, services, reload, login, accountInfo, setLogin, setEmployees, setServices, setReload }}>
          <Header />
          <Outlet />
          <Offcanvas />
        </MainContext.Provider>
      </div>
    );
  }
}

export default Dashboard;
