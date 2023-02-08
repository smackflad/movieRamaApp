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

  useEffect(()=>{
    setIsLoading(true);
    const token= localStorage.getItem('accessToken');
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    axios.post(`http://localhost:3001/users/validate`)
    .then(res => {
      console.log(res.data);
      setUsr(res.data);
      setLoggedIn(true);
      setIsLoading(false);
      sequence();
    })
    .catch(error =>{
      localStorage.clear('accessToken');
      setIsLoading(false);
      setLoggedIn(false);
      sequence();
    })
  }, [])


  
  
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
    }
    
  useEffect(()=>{
    // sequence();
  });

  if(isLoading){
    return (<>
    <div className="homePage-external">
      <motion.div className="homePage-logo"
        initial={{ scale: 1 }}
        animate={animationControls}
      >
        <img src={mainLogo} />
        <img className="homePage-logo-loading" src={loading} />
      </motion.div>
    </div>
  </>)
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
    </motion.div>
    <motion.div
      className="homePage-posts"
      variants={container}
      initial="hidden"
      animate="show"
      >
        <NavBar usr={usr}/>
        <div className="NavBar-bot">
          <div className="NavBar-bot-left">
              <button>All Posts</button>
              <button>New Posts</button>
              {(loggedIn) &&
                  <button>My Posts</button>
              }
          </div>
          <div className="NavBar-bot-right">
              <div className="NavBar-bot-right-dropdown">
                  <div ref={refDropdownbtn} className="NavBar-bot-right-dropdown-btn" onClick={()=>{setDropdownIsOpen(!dropdownIsOpen)}}>
                      <div className="NavBar-bot-right-dropdown-txt">
                          Sort by: Date
                      </div>
                      <span className="material-symbols-rounded">
                          expand_more
                      </span>
                  </div>
                  {(dropdownIsOpen) &&
                      <div className="NavBar-bot-right-dropdown-list" ref={refDropdown}>
                          <ul>
                              <li>Date</li>
                              <li>Likes</li>
                              <li>Hates</li>
                          </ul>
                      </div>
                  }
              </div>
          </div>
        </div>
        <MovieComponent
          id={5}
          title={"The Empire Strikes Back"}
          desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
          nOuser={"Smackflad"}
          nOlikes={5}
          nOHates={3}
          isLiked={0}
          />
        <MovieComponent
          id={5}
          title={"The Empire Strikes Back"}
          desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
          nOuser={"Smackflad"}
          nOlikes={5}
          nOHates={3}
          isLiked={1}
          />
        <MovieComponent
          id={5}
          title={"The Empire Strikes Back"}
          desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
          nOuser={"Smackflad"}
          nOlikes={5}
          nOHates={3}
          isLiked={2}
          />
        <MovieComponent
          id={5}
          title={"The Empire Strikes Back"}
          desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
          nOuser={"Smackflad"}
          nOlikes={5}
          nOHates={3}
          isLiked={0}
        />
        {(loggedIn) &&
          <motion.div className="Homepage-chevronBtn" variants={item}
            whileTap={{scale:0.8}}
            whileHover={{scale:1.1}}>
            <button
              className="chevronButton"
              type="submit"
              onClick={()=>{}}
            >
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