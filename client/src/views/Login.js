import React, {useState, useContext} from "react";
import {LoginContext} from "../store/LoginContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const ctx = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fetchLogin = async () => {
    try {
      const request = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      if (request.status !== 200) {
        throw new Error('Username or password incorrect');
      }
      const response = await request.json();
      sessionStorage.setItem('user', JSON.parse(atob(response.split('.')[1]))?.data);
      sessionStorage.setItem('token', response);
      ctx.setIsLoggedIn(true);
      navigate('/');
    } catch (e) {
      console.log(e);
    }

  }


  return (
    <div className='loginWrapper'>
      <h2 style={{marginBottom: '72px'}}>Assignments grading management</h2>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" placeholder="Enter your email"
             onChange={(e) => setEmail(e.target.value)}/>

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Enter your password"
             onChange={(e) => setPassword(e.target.value)}/>

      <button onClick={() => fetchLogin()}>Login</button>
      <button onClick={() => navigate('/register')}>Sign up</button>
    </div>
  )
}

export default Login;
