import "./loginPage.css";
import mainLogo from "./../../../imgs/logoc.png";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAnimation, motion, delay } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LoginPage = () => {
  let navigate = useNavigate();

return (
  <div className="loginPage-external">
    <div className="loginPage-internal">
        <div className="loginPage-logo">
          <img src={mainLogo} />
        </div>
        <div className="loginPage-other">
          <div className="loginPage-inputs">
            
          </div>
          <div className="loginPage-signup">

          </div>
        </div>
    </div>
  </div>
  );
};

export default LoginPage;