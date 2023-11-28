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
    <div className='top-nav'>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <div className='title-and-symbols'>
        <span class="material-symbols-outlined">folder_data</span>
        <span className='title'>File Uploader</span>
      </div>
    <Router> 
      <nav className="header"> 
        {isAuth && <button className="header-button" onClick = {signUserOut}>Log Out</button>}
        {isAuth && <button className="header-button" onClick = {navigateToHome}>Home</button>}
        {isAuth && <button className="header-button" onClick = {navigateToUpload}>Upload</button>}
      </nav>
      <Routes>
        <Route path="/login" element={ <Login setIsAuth={setIsAuth} setUsername = {setUsername} username={username}/> } />
        <Route path="/" element={ <Home isAuth={isAuth} username={username}/> } />
        <Route path="/upload" element={ <Upload isAuth={isAuth} username={username}/> } />
      </Routes>
    </Router>
    </div>
  );
};

export default App;