import React, {useState, useContext} from "react";
import { LoginContext } from "../store/LoginContext";

const Login = () => {
    const ctx = useContext(LoginContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fetchLogin = async() => {
        console.log(JSON.stringify({email, password}));
        const request = await fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const response = await request.json();
        sessionStorage.setItem('user', JSON.stringify(response));
        ctx.setIsLoggedIn(response != null);
    }


    return(
        <div className='formWrapper'>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Your email.."
            onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password"
            onChange={(e) => setPassword(e.target.value)} />

        <input type="submit" value="Submit" onClick={() => fetchLogin()} />
    </div>
    )
}

export default Login;