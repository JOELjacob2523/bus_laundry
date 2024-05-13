import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityTotal from "./components/city_total";
import PageHeader from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainPage2 from "./components/mainPage2/main_page2";
import PageFooter from "./components/footer/footer";

function App() {
  return (
    <div className="main_root_container">
      <div className="page_header">
        <PageHeader />
      </div>
      <div className="sidebar">
        <Sidebar />
        <div className="main_page_container">
          <MainPage2 />
        </div>
      </div>
      {/* <div>
        <Router>
          <Routes>
            <Route path="/" exact element={<CityTotal />} />
          </Routes>
        </Router>
      </div> */}
      <div>
        <PageFooter />
      </div>
    </div>
  );
}

export default App;
