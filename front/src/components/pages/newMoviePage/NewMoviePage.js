import "./newMoviePage.css";
import mainLogo from "./../../../imgs/logoc.png";
import NavBar from "../homePage/components/navBar/NavBar";
import loading from "./../../../imgs/loading.svg";

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'animate.css';
import { useAnimation, motion } from "framer-motion";
import axios from 'axios';

const NewMoviePage = () => {
  let navigate = useNavigate();  

  // const accessToken = localStorage.getItem('accessToken');

  
  const [usr, setUsr] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{
    setIsLoading(true);
    const token= localStorage.getItem('accessToken');
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      axios.post(`http://localhost:3001/users/validate`)
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

  if(isLoading){
    return (<>
    <div className="newMoviePage-external">
      <motion.div className="newMoviePage-logo"
        initial={{ scale: 1 }}
      >
        <img className="newMoviePage-logo-loading" src={loading} />
      </motion.div>
    </div>
  </>)
  }


return (
  <div className="newMoviePage-external">
    <NavBar usr={usr}/>
  </div>
  );
};

export default NewMoviePage;