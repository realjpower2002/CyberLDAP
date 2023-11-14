import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Upload from './Pages/Upload';

const App = () => {

  const [isAuth, setIsAuth] = useState(window.localStorage.getItem("isAuth"));
  const [username, setUsername] = useState(window.localStorage.getItem("username"));

  const signUserOut = () => {
    window.localStorage.clear();
    setIsAuth(false);
    window.location.pathname = "/login";
  }

  const navigateToHome = () => {
    window.location.pathname = "/";
  }
  const navigateToUpload = () => {
    window.location.pathname = "/upload";
  }

  return (
    <Router> 
      <nav>
        {isAuth && <button onClick = {signUserOut}>Log Out</button>}
        {isAuth && <button onClick = {navigateToHome}>Home</button>}
        {isAuth && <button onClick = {navigateToUpload}>Upload</button>}
      </nav>
      <Routes>
        <Route path="/login" element={ <Login setIsAuth={setIsAuth} setUsername = {setUsername} username={username}/> } />
        <Route path="/" element={ <Home isAuth={isAuth} username={username}/> } />
        <Route path="/upload" element={ <Upload isAuth={isAuth} username={username}/> } />
      </Routes>
    </Router>
  );
};

export default App;