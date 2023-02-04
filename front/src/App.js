import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/pages/homePage/HomePage';
import LoginPage from './components/pages/loginPage/LoginPage';


function App() {
  return (
    <Router>
        <div className='Body test'>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
