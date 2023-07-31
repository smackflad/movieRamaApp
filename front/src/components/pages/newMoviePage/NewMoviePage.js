import "./newMoviePage.css";
import NavBar from "../homePage/components/navBar/NavBar";
import loading from "./../../../imgs/loading.svg";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'animate.css';
import { motion } from "framer-motion";
import axios from 'axios';
import AppContext from "../../../AppContext";

const NewMoviePage = () => {
  const { handleButtonClick } = useContext(AppContext);

  let navigate = useNavigate();

  
  const [usr, setUsr] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{
    setIsLoading(true);
    const token= localStorage.getItem('accessToken');
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/validate`)
      .then(res => {
        setUsr(res.data);
        setIsLoading(false);
      })
      .catch(error =>{
        navigate('/');
      })
    }else{
      navigate('/');
    }
    axios.defaults.headers.common = {}
  }, [])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);

    const token= localStorage.getItem('accessToken');
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/movies/create`, {
        title: e.target.title.value,
        description: e.target.desc.value,
      })
        .then(res => {
          
          setIsLoading(false);
          navigate("/");
        })
        .catch(error =>{
          // popup error
          handleButtonClick(0);
          setIsLoading(false);
        })
    }
  }






  if(isLoading){
    return (<>
    <div className="newMoviePage-external">
      <motion.div className="newMoviePage-logo"
        initial={{ scale: 1 }}
      >
        <img className="newMoviePage-logo-loading" src={loading} alt="Loading"/>
      </motion.div>
    </div>
  </>)
  }


return (
  <div className="newMoviePage-external">
    <NavBar usr={usr}/>
    <div className="newMoviePage-internal">
      <form onSubmit={handleSubmit}>
          <input className="newMoviePage-title" type="txt" id="title" name="title" placeholder="Movie Title" required/>
          <textarea className="newMoviePage-desc" id="desc" name="desc" placeholder="Some words about the movie" required/>
          <div className="newMoviePage-submit-container">
            <motion.input 
            className="newMoviePage-submit" type="submit" 
            whileTap={{scale:0.9}}
            whileHover={{scale:1.05}}/>
          </div>
      </form>
    </div>
  </div>
  );
};

export default NewMoviePage;