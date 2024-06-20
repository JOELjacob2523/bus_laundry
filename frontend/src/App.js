import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityTotal from "./components/city_total";
import PageHeader from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import PageFooter from "./components/footer/footer";
import Buses from "./components/buses/buses";
import Details from "./components/details/details";
import Error500 from "./components/error/error";
import UserLogin from "./userComponents/login/login";
import UserSignup from "./userComponents/signup/signup";

function App() {
  return (
    <div className="main_root_container">
      <div className="page_header">
        <PageHeader />
      </div>
      <div className="sidebar">
        <Sidebar />
        <div className="main_page_container">
          <Routes>
            <Route path="/" exact element={<UserLogin />} />
            <Route path="/signup" exact element={<UserSignup />} />
            <Route path="/home" exact element={<CityTotal />} />
            <Route path="/buses" exact element={<Buses />} />
            <Route path="/details" exact element={<Details />} />
            <Route path="/error500" exact element={<Error500 />} />
          </Routes>
        </div>
      </div>

      <div className="footer">
        <PageFooter />
      </div>
    </div>
  );
}

export default App;
