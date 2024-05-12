import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CityTotal from "./components/city_total";
import PageHeader from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import MainPage from "./components/mainPage2/main_page";
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
          <MainPage />
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
