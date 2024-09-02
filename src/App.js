import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import Login from "./componenets/login";
import Register from "./componenets/register";
import Archive from "./componenets/archive";
import Error404 from "./componenets/error404";
import Setting from "./componenets/setting";
import NewPatient from "./componenets/newPatient";
import Home from "./componenets/home";
import FilesWrapper from "./componenets/filesWrapper";
import Files from "./componenets/files";
import SelectedFile from "./componenets/selectedFile";
import "./assets/CSS/signin.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/newPatient" element={<NewPatient />} />
          <Route path="/files" element={<FilesWrapper />}>
            <Route path="/files" element={<Files />} />
            <Route path="/files/selectedfile" element={<SelectedFile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
