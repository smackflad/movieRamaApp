import "./loginPage.css";
import mainLogo from "./../../../imgs/logoflat.png";
import mainLogoC from "./../../../imgs/logoc.png";
import loading from "./../../../imgs/loading.svg";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAnimation, motion, delay, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from 'axios';

const LoginPage = () => {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [emailDisabled, setEmailDisabled] = useState(false);

  const initLogo = {
    show: {
    //   opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    hidden: { opacity: 0, y: -60, transition: { duration: 0.2 } }
  
      
  };

  const handleSubmit = async ()=>{
    setEmailDisabled(true);
    // e.preventDefault();
    // console.log(e.target);
    setIsLoading(true);
    await axios.post(`http://localhost:3001/users/exists`, {
      email: email
    })
      .then(res => {
        if(res.data){
          setIsLogin(true);
        }else{
          setIsRegister(true);
        }
        setIsLoading(false);
      })
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    console.log(e.target);
    setIsLoading(true);
    // await axios.post(`http://localhost:3001/users/exists`, {
    //   email: email
    // })
    //   .then(res => {
    //     if(res.data){
    //       setIsLogin(true);
    //     }else{
    //       setIsRegister(true);
    //     }
    //     setIsLoading(false);
    //   })
  }

  const handleRegister = async (e)=>{
    e.preventDefault();
    // console.log(e.target.firstName.value);
    if(e.target.password.value !== e.target.repPass.value){

    }else{
      setIsLoading(true);
      await axios.post(`http://localhost:3001/users/create`, {
          email: email,
          username: "test",
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          password: e.target.password.value
      })
        .then(res => {
          setEmail("");
          setIsLogin(true);
          setIsRegister(false);
          setIsLoading(false);
        })
        .catch(error =>{
          setEmail("");
          setIsLogin(false);
          setIsRegister(false);
          setIsLoading(false);
        })
    }
  }
return (
  <div className="loginPage-external">
    <div className="loginPage-internal">
      <div className="loginPage-logo">
        <AnimatePresence mode="wait">
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
          {!(isLogin || isRegister) &&
            <form> {/* first step */}
              <motion.input className="loginPage-inputs-txt" type="text" placeholder="Enter your email" required
              key="email"
              id="email"
              name="email"
              disabled={emailDisabled}
              initial={{ y: 100, opacity:0}}
              animate={{ y: 0, opacity:1}}
              transition={{
                delay: 0.2
              }}
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              />
              {!(isLoading) ?
                (
                  <>
                    <motion.input className="loginPage-inputs-submit" type="submit" onClick={()=>{handleSubmit() }} value="Connect"
                      key="submit"
                      initial={{ y: 100, opacity:0}}
                      animate={{ y: 0, opacity:1}}
                      transition={{
                        delay: 0.2
                    }}/>
                  </>
                ):(
                  <>
                    <img src={loading} />
                  </>
                )
              }
            </form>
          }
          {(isLogin) &&
            <form onSubmit={handleLogin}> {/* login */}
              <motion.input className="loginPage-inputs-txt" type="text" placeholder="Enter your email" required
              key="email"
              id="email"
              name="email"
              disabled={emailDisabled}
              initial={{ y: 100, opacity:0}}
              animate={{ y: 0, opacity:1}}
              transition={{
                delay: 0.2
              }}
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              />
              <motion.input className="loginPage-inputs-txt" type="password" placeholder="Password" required
                key="loginPassword"
                initial={{ y: 100, opacity:0}}
                animate={{ y: 0, opacity:1}}
                transition={{
                  delay: 0.2
                }}
              />
              {!(isLoading) ?
                (
                  <>
                    <motion.input className="loginPage-inputs-submit" type="submit" value="Connect"
                      key="submit"
                      initial={{ y: 100, opacity:0}}
                      animate={{ y: 0, opacity:1}}
                      transition={{
                        delay: 0.2
                    }}/>
                  </>
                ):(
                  <>
                    <img src={loading} />
                  </>
                )
              }
            </form>
          }
          {(isRegister) &&
            <form onSubmit={handleRegister}> {/* register */}
              <motion.input className="loginPage-inputs-txt" type="text" placeholder="Enter your email" required
                key="email"
                id="email"
                name="email"
                disabled={emailDisabled}
                initial={{ y: 100, opacity:0}}
                animate={{ y: 0, opacity:1}}
                transition={{
                  delay: 0.2
                }}
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              <motion.input className="loginPage-inputs-txt" type="text" placeholder="First Name" required
                key="fName"
                id="firstName"
                name="firstName"
                initial={{ y: 100, opacity:0}}
                animate={{ y: 0, opacity:1}}
                transition={{
                  delay: 0.2
                }}
              />
              <motion.input className="loginPage-inputs-txt" type="text" placeholder="Last Name" required
                key="lName"
                id="lastName"
                name="lastName"
                initial={{ y: 100, opacity:0}}
                animate={{ y: 0, opacity:1}}
                transition={{
                  delay: 0.2
                }}
              />
              <motion.input className="loginPage-inputs-txt" type="password" placeholder="Password" required
                key="regPass"
                id="password"
                name="password"
                initial={{ y: 100, opacity:0}}
                animate={{ y: 0, opacity:1}}
                transition={{
                  delay: 0.2
                }}
              />
              <motion.input className="loginPage-inputs-txt" type="password" placeholder="Repeat Password" required
                key="regRepPass"
                id="repPass"
                name="repPass"
                initial={{ y: 100, opacity:0}}
                animate={{ y: 0, opacity:1}}
                transition={{
                  delay: 0.2
                }}
              />
              {!(isLoading) ?(
                <>
                  <motion.input className="loginPage-inputs-submit" type="submit" value="Register"
                    key="submit"
                    initial={{ y: 100, opacity:0}}
                    animate={{ y: 0, opacity:1}}
                    transition={{
                      delay: 0.2
                  }}/>
                </>
              ):(
                <>
                  <img src={loading} />
                </>
              )
              }
            </form>
          }
        </div>
        <div className="loginPage-signup">

        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;