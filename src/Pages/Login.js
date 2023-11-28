// src/components/About.js
// Login.js
import React, { useState } from 'react';

//remove "username" include here and in app, we shouldn't need it...
const Login = ( {setIsAuth, setUsername, username} ) => {

    const [password, setPassword] = useState('');

    //let navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("User&Pass");
        console.log("User: ",username);
        console.log("Pass: ",password);

        //send these to the server and get back and authentication token in the final
        //build

        window.localStorage.setItem("isAuth", true);
        window.localStorage.setItem("username", username);

        setIsAuth(true);

        window.location.pathname = "/";
    };

    return ( 
        <div id="login-section" class="section">
            <h2>Login Form</h2>

            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br />

                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;