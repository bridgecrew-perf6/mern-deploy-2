
import './App.css';
import User from "./components/User"
import Profile from './components/Profile';
import Auth from './components/Auth';
import Userdata from './components/Userdata';
import { CreateUser } from './components/CreateUser';
import EditUser from './components/EditUser';
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
      <Route exact path="/userdata" element={<Userdata/>} />
      <Route exact path="/createuser" element={<CreateUser/>} />
      <Route exact path="/edit/:id" element={<EditUser/>} />
      </Routes>
    </Router>
  
  );
}

export default App;
