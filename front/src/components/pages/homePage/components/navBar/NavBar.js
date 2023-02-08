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
                        <span className="NavBar-top-right-span" onClick={()=>{navigate('/login')}}>Log in</span>
                    ):(
                        <div className="NavBar-top-right-dropdown">
                            <div ref={refDropdownbtn} className="NavBar-top-right-dropdown-btn" onClick={()=>{setDropdownIsOpen(!dropdownIsOpen)}}>
                                <span>Welcome back, {firstName}</span>
                                <span class="material-symbols-outlined">
                                    account_circle
                                </span>
                            </div>
                            {(dropdownIsOpen) &&
                                <div className="NavBar-top-right-dropdown-list" ref={refDropdown}>
                                    <ul>
                                        <li>Profile</li>
                                        <li onClick={()=>{localStorage.removeItem('accessToken');navigate(0) }}>Logout</li>
                                    </ul>
                                </div>
                            }
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    </div>
  );
};

export default NavBar;