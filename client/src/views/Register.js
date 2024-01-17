import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();
  const register = async() => {
    await fetch('http://localhost:4000/users/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, email, password, role})
    }).then(() => {
      navigate('/login');
    })

  }
  return <>
    <div className='loginWrapper'>
      <h2 style={{marginBottom: '72px'}}>Enroll into grading management app</h2>
      <label htmlFor="email">Username</label>
      <input type="text" id="email" name="email" placeholder="Your username.."
             onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" placeholder="Your email"
             onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Your password"
             onChange={(e) => setPassword(e.target.value)} />
      <label>Your role</label>
      <select onChange={(e) => setRole(e.target.value)}>
        <option>student</option>
        <option>professor</option>
      </select>
      <button onClick={() => register()}>Register</button>
    </div>
  </>
}

export default Register;
