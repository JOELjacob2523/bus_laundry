import './App.css';
import Buttons from './components/main_page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HebrewDate from './components/hebrew_date';

function App() {

  return(
    <>
    < HebrewDate />

    <Router>
    <Routes>

      <Route path='/' exact element={ <Buttons /> } />

      </Routes>
    </Router>
    </>
  )
}

export default App;
