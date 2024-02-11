import './App.css';
import NameList from './components/name_list';
import Header from './components/header';
import {apiCall} from './components/try_axios';

apiCall()

function App() {
  return(
    <div>
    <Header />
    <NameList />
    </div>
  )
}

export default App;
