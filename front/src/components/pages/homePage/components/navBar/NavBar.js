import "./navBar.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAnimation, motion, delay, AnimatePresence } from "framer-motion";
import axios from "axios";
import mainLogo from "../../../../../imgs/logoflat.png";


const NavBar = ({usr}) => {
const [loggedIn, setLoggedIn] = useState(false);
const [firstName, setFirstName] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);


let navigate = useNavigate();
const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

const refDropdown = useRef(null);
  const refDropdownbtn = useRef(null);
  
  useEffect(() =>{
      if(usr.id){
          setFirstName(usr.firstName);
          setLoggedIn(true);
      }
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) =>{
    if(refDropdownbtn.current && !refDropdownbtn.current.contains(e.target) && refDropdown.current && !refDropdown.current.contains(e.target)){
        setDropdownIsOpen(false);
    }
  };




  return (
    <div className="NavBar-external">
        <div className="NavBar-internal">
            <div className="NavBar-top">
                <div className="NavBar-top-left">
                    <img src={mainLogo} />
                </div>
                <div className="NavBar-top-right">
                    {!(loggedIn) ?(
                        <span onClick={()=>{navigate('/login')}}>Log in</span>
                    ):(
                            <span>Welcome, {firstName}</span>
                    )
                    }
                </div>
            </div>
            <div className="NavBar-bot">
                <div className="NavBar-bot-left">
                    <button>All Posts</button>
                    <button>New Posts</button>
                    <button>My Posts</button>
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
        </div>
    </div>
  );
};

export default NavBar;