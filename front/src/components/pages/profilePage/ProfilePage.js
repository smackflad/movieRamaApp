import "./profilePage.css";
import mainLogo from "./../../../imgs/logoc.png";
import NavBar from "../homePage/components/navBar/NavBar";
import loading from "./../../../imgs/loading.svg";

import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'animate.css';
import { useAnimation, motion } from "framer-motion";
import axios from 'axios';
import CustomTextBox from "./customTextBox/CustomTextBox";
import AppContext from "../../../AppContext";

const ProfilePage = () => {
  const { handleButtonClick } = useContext(AppContext);
  let navigate = useNavigate();  

  // const accessToken = localStorage.getItem('accessToken');

  
  const [usr, setUsr] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [emailDisabled, setEmailDisabled] = useState(false);

  const [oldPasswd, setOldPasswd] = useState("");
  const [passwd, setPasswd] = useState("");
  const [newPasswd, setNewPasswd] = useState("");
  const [repPasswd, setRepPasswd] = useState("");

  const [regPasswdErr, setRegPasswdErr] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  useEffect(()=>{
    setIsLoading(true);
    const token= localStorage.getItem('accessToken');
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/validate`)
      .then(res => {
        setUsr(res.data);
        setEmail(res.data.email)
        setFirstName(res.data.firstName)
        setLastName(res.data.lastName)
        setIsLoading(false);
      })
      .catch(error =>{
        console.log(error)
        navigate('/');
      })
    }else{
      navigate('/');
    }
    axios.defaults.headers.common = {}
  }, [])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    const token= localStorage.getItem('accessToken');
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/update`, {
        firstName: firstName,
        lastName: lastName
      })
      .then(res => {
        setIsLoading(false);
        navigate(0);
      })
      .catch(error =>{
        handleButtonClick(0);
        setIsLoading(false);
      })
    }
  }

  const handleSubmitPassword = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    const token= localStorage.getItem('accessToken');
    if(token){
      axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/updatePassword`, {
        password: oldPasswd,
        newPassword: newPasswd
      })
      .then(res => {
        setIsLoading(false);
        navigate(0);
      })
      .catch(error =>{
        // popup error
        if(error.response){
          handleButtonClick(3)
        }
        console.log(error)
        setIsLoading(false);
      })
    }
  }






  if(isLoading){
    return (<>
    <div className="profilePage-external">
      <motion.div className="profilePage-logo"
        initial={{ scale: 1 }}
      >
        <img className="profilePage-logo-loading" src={loading} />
      </motion.div>
    </div>
  </>)
  }


return (
  <div className="profilePage-external">
    <NavBar usr={usr}/>
    <div className="profilePage-internal">
    <form onSubmit={handleSubmit}>
      <CustomTextBox 
        keyy="email"
        name="email"
        disabled={true}
        isError={false}
        placeholder="Email"
        change={(e)=>{setEmail(e.target.value)}}
        value={email}
      />
      <CustomTextBox 
        keyy="fName"
        name="firstName"
        disabled={false}
        isError={false}
        placeholder="First Name"
        value={firstName}
        change={(e)=>{setFirstName(e.target.value)}}
      />
      <CustomTextBox 
        keyy="lName"
        name="lastName"
        disabled={false}
        isError={false}
        placeholder="Last Name"
        value={lastName}
        change={(e)=>{setLastName(e.target.value)}}
      />
      <div className="profilePage-submit-container">
        <motion.input 
        className="profilePage-submit" type="submit" value="Update"
        whileTap={{scale:0.9}}
        whileHover={{scale:1.05}} />
      </div>
    </form>
    <form onSubmit={handleSubmitPassword}>
      <CustomTextBox 
        keyy="oldPass"
        name="oldPass"
        disabled={false}
        isError={false}
        value={oldPasswd}
        change={(e)=>{setOldPasswd(e.target.value)}}
        placeholder="Password"
        type="password"
      />
      <CustomTextBox 
        keyy="newPass"
        name="newPass"
        disabled={false}
        value={newPasswd}
        change={(e)=>{setNewPasswd(e.target.value);if(!(e.target.value)){setRepPasswd("");setRegPasswdErr(false)}}}
        isError={false}
        errorMessage="Passwords do not match"
        placeholder="New Password"
        type="password"
      />
      <CustomTextBox 
        keyy="repnewPass"
        name="repnewPass"
        disabled={!newPasswd}
        value={repPasswd}
        change={(e)=>{
          setRepPasswd(e.target.value)
            if(e.target.value !== newPasswd){
              setRegPasswdErr(true)
            }else{
              setRegPasswdErr(false)
            }
        }}
        isError={regPasswdErr}
        errorMessage="Passwords do not match"
        placeholder="Repeat New Password"
        type="password"
      />
          <div className="profilePage-submit-container">
            <motion.input 
            className="profilePage-submit" type="submit" value="Update Password"
            disabled={(!repPasswd) || regPasswdErr }
            whileTap={!((!repPasswd) || regPasswdErr) ? {scale:0.9} : {}}
            whileHover={!((!repPasswd) || regPasswdErr) ? {scale:1.05} : {}} />
          </div>
      </form>
    </div>
  </div>
  );
};

export default ProfilePage;