import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/pages/homePage/HomePage';


function App() {
  return (
    <Router>
        <div className='Body test'>
          <Routes>
            <Route path="/" element={<HomePage />}>

            </Route>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
