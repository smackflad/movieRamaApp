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

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    console.log({title: e.target.title.value,
      description: e.target.desc.value,
      author: usr.id,
      authorName: usr.firstName +" "+ usr.lastName})
    await axios.post(`http://localhost:3001/movies/create`, {
      title: e.target.title.value,
      description: e.target.desc.value,
      author: usr.id,
      authorName: usr.firstName +" "+ usr.lastName
    })
      .then(res => {
        
        setIsLoading(false);
        navigate("/");
      })
      .catch(error =>{
        // popup error
        setIsLoading(false);
      })
  }






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