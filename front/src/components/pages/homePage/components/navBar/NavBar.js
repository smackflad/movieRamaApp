import "./navBar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAnimation, motion, delay, AnimatePresence } from "framer-motion";

import mainLogo from "../../../../../imgs/logoflat.png";


const NavBar = ({}) => {
  let navigate = useNavigate();

  return (
    <div className="NavBar-external">
        <div className="NavBar-internal">
            <div className="NavBar-top">
                <div className="NavBar-top-left">
                    <img src={mainLogo} />
                </div>
                <div className="NavBar-top-right">
                    <span>Log in</span>
                </div>
            </div>
            <div className="NavBar-bot">
                
            </div>
        </div>
    </div>
  );
};

export default NavBar;