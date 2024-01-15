import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import Projects from './views/Projects';
import { LoginContext } from './store/LoginContext';
import { useContext} from 'react';


function App() {
  const ctx = useContext(LoginContext)

  console.log(ctx);
  return (
    <Router>
      {!ctx.isLoggedIn && <Routes>
        <Route path='/' element={<Login />} />
      </Routes>}
      {ctx.isLoggedIn &&
        <Routes>
          <Route path='/' element={<Navigate to="/projects" />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
        </Routes>
      }

    </Router>
  );
}

export default App;
