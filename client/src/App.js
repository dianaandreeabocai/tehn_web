import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import {LoginContext} from './store/LoginContext';
import {useContext} from 'react';
import Register from "./views/Register";
import Results from "./views/Results";
import Grading from "./views/Grading";


function App() {
  const ctx = useContext(LoginContext);
  const user = JSON.parse(sessionStorage.getItem('user'));

  const logout = () => {
    ctx.setIsLoggedIn(false);
    sessionStorage.clear();
  }

  return (
    <>
      {ctx.isLoggedIn &&  <nav>
        <span>Assignments grading management</span>
        <button onClick={() => logout()}>Logout</button>
      </nav> }
      <Router>
        <Routes>
          <Route path='/' element={user?.role !== 'professor' ? <Navigate to="/dashboard"/>: <Navigate to="results" />}></Route>
          <Route path='/login' element={!ctx.isLoggedIn ?<Login /> : <Navigate to="/" />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path='/dashboard' element={ ctx.isLoggedIn ? <Dashboard/> : <Navigate to="/login" /> }></Route>
          <Route path='/results' element={ ctx.isLoggedIn ? <Results/> : <Navigate to="/login" /> }></Route>
          <Route path='/grading' element={ ctx.isLoggedIn ? <Grading/> : <Navigate to="/login" /> }></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
