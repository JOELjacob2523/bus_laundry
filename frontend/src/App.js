import "./App.css";
//import Buttons from './components/main_page';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HebrewDate from "./components/hebrewDate/hebrewDate";
import CityTotal from "./components/city_total";

function App() {
  return (
    <>
      {/* < HebrewDate /> */}

      <Router>
        <Routes>
          <Route path="/" exact element={<CityTotal />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
