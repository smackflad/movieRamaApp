import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/pages/homePage/HomePage';
import LoginPage from './components/pages/loginPage/LoginPage';
import NewMoviePage from './components/pages/newMoviePage/NewMoviePage';
import ProfilePage from './components/pages/profilePage/ProfilePage';
import AppContext from './AppContext';
import PopupMessage from './components/generalComponents/popupMessage/PopupMessage';
import { useState } from 'react';


function App() {
  const [popup, setPopup] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const handleButtonClick = (pp) => {
    console.log("test")
    setPopup(pp)
    setShowNotification(true);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <AppContext.Provider value={{handleButtonClick}}>
      <Router>
          <div className='Body test'>
            {showNotification &&(
              <PopupMessage  message={popup} onTimeout={handleNotificationClose}/>
            )}
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/createMovie" element={<NewMoviePage />}/>
              <Route path="/profile" element={<ProfilePage />}/>
            </Routes>
          </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
