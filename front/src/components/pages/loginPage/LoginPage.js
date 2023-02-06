import "./loginPage.css";
import mainLogo from "./../../../imgs/logoflat.png";
import mainLogoC from "./../../../imgs/logoc.png";
import loading from "./../../../imgs/loading.svg";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAnimation, motion, delay, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LoginPage = () => {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initLogo = {
    show: {
    //   opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    hidden: { opacity: 0, y: -60, transition: { duration: 0.2 } }
  
      
  };
return (
  <div className="loginPage-external">
    <div className="loginPage-internal">
      <div className="loginPage-logo">
        <AnimatePresence exitBeforeEnter>
        {!(isLogin || isRegister) ?(
          <>
            <motion.div className="loginPage-logo-img"
              key="initialA"
              initial={{ y: -100, scale: 0, opacity:0}}
              animate={{ y: 0, scale: 1, opacity:1}}
              exit={{ y: 100, scale: 0, opacity:0 }}
              >
              <span className="loginPage-logo-high">Welcome to</span>
            </motion.div>
            <motion.div className="loginPage-logo-img"
              key="initialB"
              initial={{ y: -100, scale: 0, opacity:0}}
              animate={{ y: 0, scale: 1, opacity:1}}
              exit={{ y: 100, scale: 0, opacity:0 }}
              >
              <img src={mainLogo} />
            </motion.div>
          </>
        ):(
          <motion.div className="loginPage-logo-imgC"
            key="nextStep"
            initial={{ y: 100, opacity:0}}
            animate={{ y: 0, opacity:1}}
            // exit={{ opacity:0, duration: 2, delay: 5  }}
            transition={{
              // delay: 0.2
            }}
              >
            <img src={mainLogoC} />
          </motion.div>        
        )}
        </AnimatePresence>
      </div>
      {(!(isLogin || isRegister) || isLogin) &&
        <span className="loginPage-logo-low">Connect!</span>
      }
      {(isRegister) &&
        <span className="loginPage-logo-low">Create a new account!</span>
      }
      <div className="loginPage-other">
        <div className="loginPage-inputs">
          <form>
            <motion.input className="loginPage-inputs-txt" type="text" placeholder="Enter your email" required
            key="email"
            initial={{ y: 100, opacity:0}}
            animate={{ y: 0, opacity:1}}
            transition={{
              delay: 0.2
            }}
            />
            {!(isLoading) ?(
              <>
                {(isLogin) &&
                  <>
                    <motion.input className="loginPage-inputs-txt" type="password" placeholder="Password" required
                    key="loginPassword"
                    initial={{ y: 100, opacity:0}}
                    animate={{ y: 0, opacity:1}}
                    transition={{
                      delay: 0.2
                    }}
                    />
                  </>
                }
                {(isRegister) &&
                  <>
                    <motion.input className="loginPage-inputs-txt" type="text" placeholder="First Name" required
                    key="fName"
                    initial={{ y: 100, opacity:0}}
                    animate={{ y: 0, opacity:1}}
                    transition={{
                      delay: 0.2
                    }}/>
                    <motion.input className="loginPage-inputs-txt" type="text" placeholder="Last Name" required
                    key="lName"
                    initial={{ y: 100, opacity:0}}
                    animate={{ y: 0, opacity:1}}
                    transition={{
                      delay: 0.2
                    }}/>
                    <motion.input className="loginPage-inputs-txt" type="password" placeholder="Password" required
                    key="regPass"
                    initial={{ y: 100, opacity:0}}
                    animate={{ y: 0, opacity:1}}
                    transition={{
                      delay: 0.2
                    }}/>
                    <motion.input className="loginPage-inputs-txt" type="password" placeholder="Repeat Password" required
                    key="regRepPass"
                    initial={{ y: 100, opacity:0}}
                    animate={{ y: 0, opacity:1}}
                    transition={{
                      delay: 0.2
                    }}/>
                  </>
                }
                <motion.input className="loginPage-inputs-submit" type="submit" onClick={()=>{setIsLoading(true); }} value="Continue"
                key="submit"
                initial={{ y: 100, opacity:0}}
                animate={{ y: 0, opacity:1}}
                transition={{
                  delay: 0.2
                }}/>
              </>
            ): (
              <>
                <img src={loading} />
              </>
            )}
          </form>
        </div>
        <div className="loginPage-signup">

        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;