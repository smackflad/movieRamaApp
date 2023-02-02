import "./navBar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAnimation, motion, delay, AnimatePresence } from "framer-motion";

import mainLogo from "../../../../../imgs/logoflat.png";


const NavBar = ({}) => {
  let navigate = useNavigate();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(true);

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
                <div className="NavBar-bot-left">
                    <button>All Posts</button>
                    <button>New Posts</button>
                    <button>My Posts</button>
                </div>
                <div className="NavBar-bot-right">
                    <div className="NavBar-bot-right-dropdown">
                        <div className="NavBar-bot-right-dropdown-btn" onClick={()=>{setDropdownIsOpen(!dropdownIsOpen)}}>
                            <div className="NavBar-bot-right-dropdown-txt">
                                Sort by: Date
                            </div>
                            <span class="material-symbols-rounded">
                                expand_more
                            </span>
                        </div>
                        {(dropdownIsOpen) &&
                            <div className="NavBar-bot-right-dropdown-list">
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