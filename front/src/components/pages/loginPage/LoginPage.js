import "./loginPage.css";
import mainLogo from "./../../../imgs/logoflat.png";
import mainLogoC from "./../../../imgs/logoc.png";
import loading from "./../../../imgs/loading.svg";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import CustomTextBox from "../../generalComponents/customTextBox/CustomTextBox";
import AppContext from "../../../AppContext";

const LoginPage = () => {
  const { handleButtonClick } = useContext(AppContext);

  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [emailDisabled, setEmailDisabled] = useState(false);

  const [regPasswd, setRegPasswd] = useState("");
  const [regRepPasswd, setRegRepPasswd] = useState("");
  const [regPasswdErr, setRegPasswdErr] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setEmailDisabled(true);
    setIsLoading(true);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/exists`, {
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
    .catch(error =>{
      if(error.response){
      }else if(error.request){
        handleButtonClick(0)
        setIsLoading(false)
      }
      setEmailDisabled(false);
    })
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
      email: email,
      password: e.target.password.value
    })
      .then(res => {
        localStorage.setItem("accessToken", res.data.accessToken);
        setIsLoading(false);
        navigate("/")
      })
      .catch(error =>{
      console.log(error.request)
        console.log(error.response.status)
        if(error.response.status === 401){
          handleButtonClick(1);
        }else if(error.response.status === 404){
          handleButtonClick(2);
        }else{
          handleButtonClick(0);
        }
        setIsLoading(false);
      })
  }

  const handleRegister = async (e)=>{
    e.preventDefault();
    if(e.target.password.value !== e.target.repPass.value){

    }else{
      setIsLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/create`, {
          email: email,
          username: "test",
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          password: e.target.password.value
      })
        .then(res => {
          setEmail("");
          setEmailDisabled(false);
          setIsLogin(true);
          setIsRegister(false);
          setIsLoading(false);
        })
        .catch(error =>{
          handleButtonClick(0);
          setEmail("");
          setEmailDisabled(false);
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
              <img src={mainLogo} alt="Loading"/>
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
            <img src={mainLogoC} alt="Logo"/>
          </motion.div>        
        )}
        </AnimatePresence>
      </div>
      <div className="loginPage-logo-container-low">
        <AnimatePresence>
          {(isLogin || isRegister) &&
            <motion.span
              key="backbtn"
              initial={{ x: 100, opacity:0}}
              animate={{ x: 0, opacity:1}}
              whileTap={{scale:0.8}}
              whileHover={{scale:1.1}}
              className="material-symbols-outlined"
              onClick={()=>{
                setEmail("");
                setEmailDisabled(false);
                setIsLogin(false);
                setIsRegister(false);
                setIsLoading(false);}
              }>
                arrow_back_ios_new
            </motion.span>
          }
        </AnimatePresence>
        {(!(isLogin || isRegister) || isLogin) &&
          <span className="loginPage-logo-low">Connect!</span>
        }
        {(isRegister) &&
          <span className="loginPage-logo-low">Create a new account!</span>
        }
      </div>
      <div className="loginPage-other">
        <div className="loginPage-inputs">
          {!(isLogin || isRegister) &&
            <form onSubmit={handleSubmit}> {/* first step */}
              <CustomTextBox 
                keyy="email"
                name="email"
                disabled={emailDisabled}
                required={true}
                isError={false}
                placeholder="Email"
                change={(e)=>{setEmail(e.target.value)}}
                value={email}
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
                    <img src={loading} alt="Loading"/>
                  </>
                )
              }
            </form>
          }
          {(isLogin) &&
            <form onSubmit={handleLogin}> {/* login */}
              <CustomTextBox 
                keyy="email"
                name="email"
                disabled={emailDisabled}
                required={true}
                isError={false}
                placeholder="Email"
                change={(e)=>{setEmail(e.target.value)}}
                value={email}
              />
              <CustomTextBox 
                keyy="loginPassword"
                name="password"
                disabled={false}
                required={true}
                isError={false}
                placeholder="Password"
                type="password"
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
                    <img src={loading} alt="Loading"/>
                  </>
                )
              }
            </form>
          }
          {(isRegister) &&
            <form onSubmit={handleRegister}> {/* register */}
              <CustomTextBox 
              keyy="email"
              name="email"
              disabled={emailDisabled}
              required={true}
              isError={false}
              placeholder="Email"
              change={(e)=>{setEmail(e.target.value)}}
              value={email}
              />
              <CustomTextBox 
              keyy="fName"
              name="firstName"
              disabled={false}
              required={true}
              isError={false}
              placeholder="First Name"
              />
              <CustomTextBox 
              keyy="lName"
              name="lastName"
              disabled={false}
              required={true}
              isError={false}
              placeholder="Last Name"
              />
              <CustomTextBox 
              keyy="regPass"
              name="password"
              disabled={false}
              required={true}
              isError={false}
              value={regPasswd}
              change={(e)=>{
                setRegPasswd(e.target.value)
                if(e.target.value === ""){
                  setRegPasswdErr(false);
                  setRegRepPasswd("")
                }
              }}
              placeholder="Password"
              type="password"
              />
              <CustomTextBox 
              keyy="regRepPass"
              name="repPass"
              disabled={(regPasswd.length < 8)}
              required={true}
              isError={regPasswdErr}
              value={regRepPasswd}
              errorMessage="Passwords do not match"
              placeholder="Repeat Password"
              type="password"
              change={(e)=>{
                  // console.log(regPasswd);
                  setRegRepPasswd(e.target.value)
                  if(e.target.value !== regPasswd){
                    setRegPasswdErr(true)
                  }else{
                    setRegPasswdErr(false)
                  }
                }
              }
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
                  <img src={loading} alt="Loading"/>
                </>
              )
              }
            </form>
          }
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;