
import './App.css';
import User from "./components/User"
import Profile from './components/Profile';
import Auth from './components/Auth';
import { BrowserRouter as Router, Routes,
  Route} from "react-router-dom";
  import Data from './components/Data';
function App() {
  return (
    <Router  >
      <Routes>
      <Route exact path="/" element={<Auth/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="/data" element={<Data/>} />
      </Routes>
    </Router>
  
  );
}

export default App;
