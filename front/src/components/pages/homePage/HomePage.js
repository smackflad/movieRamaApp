import "./homePage.css";
import mainLogo from "./../../../imgs/logoc.png";
import MovieComponent from "./components/movieComponent/MovieComponent";
import NavBar from "./components/navBar/NavBar";
import loading from "./../../../imgs/loading.svg";

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'animate.css';
import { useAnimation, motion, delay } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from 'axios';

const HomePage = () => {
  let navigate = useNavigate();


  const [firstLoad, setFirstLoad]= useState(0);
  const [seq, setSeq] = useState(false);

  const [by, setBy] = useState(0);
  const [m, setM] = useState(0);
  const [order, setOrder] = useState(0);
  const [orderTxt, setOrderTxt] = useState("Date");

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const refDropdown = useRef(null);
  const refDropdownbtn = useRef(null);

  useEffect(() =>{
    document.addEventListener("click", handleClickOutside, true);
  }, []);
  const handleClickOutside = (e) =>{
    if(refDropdownbtn.current && !refDropdownbtn.current.contains(e.target) && refDropdown.current && !refDropdown.current.contains(e.target)){
        setDropdownIsOpen(false);
    }
  };

  // const accessToken = localStorage.getItem('accessToken');

  
  const [usr, setUsr] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  // const [moviesArray, setMoviesArray] = useState([]);
  const [moviesArrayTemp, setMoviesArrayTemp] = useState([]);


  useEffect(()=>{
    setIsLoading(true);
    const token= localStorage.getItem('accessToken');
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      axios.get(`http://localhost:3001/users/validate`)
      .then(res => {
        setUsr(res.data);
        setLoggedIn(true);
      })
      .catch(error =>{
        localStorage.clear('accessToken');
        setLoggedIn(false);
      })
    }else{
      setLoggedIn(false);
    }
  }, [])

  useEffect(()=>{
    if(moviesArrayTemp.length !== 0){
      setFirstLoad(1);
    }
    if(loggedIn){
      setIsLoading(true);
      const token= localStorage.getItem('accessToken');
      if(token){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`http://localhost:3001/movies/`+by+`/0/`+m)
        .then(res => {
          setMoviesArrayTemp(res.data)
          // setUsr(res.data);
          // setLoggedIn(true);
          setIsLoading(false);
          sequence();
        })
        .catch(error =>{
          // localStorage.clear('accessToken');
          setIsLoading(false);
          // setLoggedIn(false);
          sequence();
        })
      }
    }else{
      setIsLoading(true);
      axios.defaults.headers.common = {}
      axios.get(`http://localhost:3001/movies/`+by+`/0`)
      .then(res => {
        setMoviesArrayTemp(res.data)
        // setUsr(res.data);
        // setLoggedIn(true);
        setIsLoading(false);
        sequence();
      })
      .catch(error =>{
        // localStorage.clear('accessToken');
        setIsLoading(false);
        // setLoggedIn(false);
        sequence();
      })
    }
  }, [by, m])



  
  
  const animationControls = useAnimation();
  async function sequence() {
    await animationControls.start({ scale: 1.5, transition: {delay: 0.5} });
    await animationControls.start({ scale: 0 });
    animationControls.start({
      opacity: 0,
      transitionEnd: {
        display: "none"
      }
    });
    setSeq(true);
  }


  const container = {
    show: {
      opacity: 1,
      transition: {
        // delay: 5,
        type: "spring",
        bounce: 0,
        duration: 0.4,
        delayChildren: 1.5,
        staggerChildren: 0.1
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3
      }
    }
};
const item = {
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  hidden: { opacity: 0, y: -60, transition: { duration: 0.2 } }

    
};


return (
  <div className="homePage-external">
    <motion.div className="homePage-logo"
      initial={{ scale: 1 }}
      animate={animationControls}
    >
      <img src={mainLogo} />
      {isLoading &&
        <img className="homePage-logo-loading" src={loading} />
      }
    </motion.div>
    <motion.div
      className="homePage-internal"
      variants={container}
      initial="hidden"
      animate="show"
      >
        <NavBar usr={usr}/>
        <motion.div variants={item} className="homePage-NavBar-bot">
          <div className="homePage-NavBar-bot-left">
              {(loggedIn) &&
                <>
                  <button onClick={()=>{setM(0);}}>All Posts</button>
                  <button onClick={()=>{setM(2);}}>New Posts</button>
                  <button onClick={()=>{setM(1);}}>My Posts</button>
                </>
              }
          </div>
          <div className="homePage-NavBar-bot-right">
              <div className="homePage-NavBar-bot-right-dropdown">
                  <div ref={refDropdownbtn} className="homePage-NavBar-bot-right-dropdown-btn" onClick={()=>{setDropdownIsOpen(!dropdownIsOpen)}}>
                      <div className="homePage-NavBar-bot-right-dropdown-txt">
                          Sort by: {orderTxt}
                      </div>
                      <span className="material-symbols-rounded">
                          expand_more
                      </span>
                  </div>
                  {(dropdownIsOpen) &&
                      <div className="homePage-NavBar-bot-right-dropdown-list" ref={refDropdown}>
                          <ul>
                              <li onClick={()=>{setOrderTxt("Date"); setBy(0);setDropdownIsOpen(false)}}>Date</li>
                              <li onClick={()=>{setOrderTxt("Likes"); setBy(1);setDropdownIsOpen(false)}}>Likes</li>
                              <li onClick={()=>{setOrderTxt("Hates"); setBy(2);setDropdownIsOpen(false)}}>Hates</li>
                          </ul>
                      </div>
                  }
              </div>
          </div>
        </motion.div>
        {(isLoading || !seq) ? (
          <div className="homePage-posts-loading">
            <img className="homePage-logo-loading" src={loading} />
          </div>
        ): (
          <motion.div className="homePage-posts">
            {
            moviesArrayTemp.map((mv)=>{
              return (
                <MovieComponent
                key={mv.id}
                id={mv.id}
                title={mv.title}
                desc={mv.description}
                nOuser={mv.author.firstName+' '+mv.author.lastName}
                dOpublic={mv.datePosted}
                nOlikes={mv.likes}
                nOHates={mv.hates}
                usr={usr}
                anim={firstLoad}
                />
                );
              })
            }
          </motion.div>
        )
        }
        {(loggedIn && seq) &&
          <motion.div className="Homepage-chevronBtn" variants={item}
            key={"chevronBtn"}
            whileTap={{scale:0.8}}
            whileHover={{scale:1.1}}
            onClick={()=>{navigate('/createMovie')}}>
            <button
              className="chevronButton"
              type="submit">
              <i className="material-icons chevron-item add">
                {" "}
                add{" "}
              </i>
            </button>
          </motion.div>
        }
    </motion.div>
  </div>
  );
};

export default HomePage;