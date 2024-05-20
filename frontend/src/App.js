import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityTotal from "./components/city_total";
import PageHeader from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainPage2 from "./components/mainPage2/main_page2";
import PageFooter from "./components/footer/footer";
// import Buses1 from "./components/buses/buses1";
import Buses from "./components/buses/buses";
import EditUser from "./components/editUser/editUserBtn";
import Details from "./components/details/details";

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
            <Route path="/" exact element={<CityTotal />} />
            <Route path="/buses" exact element={<Buses />} />
            {/* <Route path="/editUser" exact element={<EditUser />} /> */}
            <Route path="/details" exact element={<Details />} />
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
