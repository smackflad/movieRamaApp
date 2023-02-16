import "./movieComponent.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'animate.css'
import { useAnimation, motion, delay, AnimatePresence, useInView } from "framer-motion";
import axios from 'axios';

const MovieComponent = ({usr, id, title, desc, nOuser, dOpublic, nOlikes, nOHates}) => {
    let navigate = useNavigate();
    const [hasReaction, setHasReaction] = useState(0);
    const [isBool, setIsBool] = useState(false);


    const react = (reaction) =>{
        axios.patch(`http://localhost:3001/movies/react/${id}`, {
            user: parseInt(usr.id),
            reaction: reaction
        })
    .catch(error => {
      return false
    })
    return true;
    }

    const [likesC, setLikesC] = useState(nOlikes.length)
    const [hatesC, setHatesC] = useState(nOHates.length)
    
    const targetDate = new Date(dOpublic);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - targetDate;

    const targetDateShow = targetDate.toLocaleString('en-GB', {
        timeZone: 'Europe/Athens',
      });
    // setDifference(differenceInMilliseconds);
    // const [dateElement, setDateElement] = useEffect();
    let dateElement;
    if(Math.floor(differenceInMilliseconds / 1000 / 60 / 60 / 24) > 0){
        dateElement = <span className="movieCBot-left-days" title={targetDateShow}>
            {Math.floor(differenceInMilliseconds / 1000 / 60 / 60 / 24)} days ago
        </span>;
    }else if(Math.floor((differenceInMilliseconds / 1000 / 60 / 60) % 24) > 0){
        dateElement = <span className="movieCBot-left-days" title={targetDateShow}>
            {Math.floor((differenceInMilliseconds / 1000 / 60 / 60) % 24)} hours ago
        </span>;
    }else if(Math.floor((differenceInMilliseconds / 1000 / 60) % 60) > 0){
        dateElement = <span className="movieCBot-left-days" title={targetDateShow}>
            {Math.floor((differenceInMilliseconds / 1000 / 60) % 60)} minutes ago
        </span>;
    }else{
        dateElement = <span className="movieCBot-left-days" title={targetDateShow}>
            {Math.floor((differenceInMilliseconds / 1000) % 60)} seconds ago
        </span>;
    }



    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() =>{
        if(usr){
            if(usr.id){
                setLoggedIn(true);
            }
            if(nOlikes.includes(parseInt(usr.id))){
                setHasReaction(1)
            }else{
                if(nOHates.includes(parseInt(usr.id))){
                    setHasReaction(2);
                }else{
                    setHasReaction(0);
                }
            }
        }
    }, []);

    const item = {
        show: {
        //   opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        hidden: { opacity: 0, y: -60, transition: { duration: 0.2 } }
    
        
    };

  return (
    <motion.div variants={item}  className="homePage-posts-container"
        // key={id}
      whileInView={{opacity: 1}}
      viewport={{ once: true }}
      >
        <div className="MovieComponent-external">
            <div className="MovieComponent-internal">
                <div className="movieC-top">
                    <span>{title}</span>
                </div>
                <div className="movieC-middle">
                    <p>{desc}</p>
                </div>
                <div className="movieC-bottom">
                    <div className="movieCBot-left">
                        <span>Posted by {nOuser}</span>
                        {dateElement}
                    </div>
                    <div className="movieCBot-right">
                        <div className="movieCBot-right-left">
                            <div className="movieCBot-right-left-inner">
                                <div className="movieCBot-right-left-center">    
                                    <span>{likesC}</span>
                                </div>
                                <span className="material-icons md-green movieCBot-right-left-mood">
                                    mood
                                </span>
                                <div className="movieCBot-right-left-center">    
                                    <span>{hatesC}</span>
                                </div>
                                <span className="material-icons md-red movieCBot-right-left-dissat">
                                    sentiment_very_dissatisfied
                                </span>
                            </div>
                        </div>
                        {(loggedIn) &&
                            <div className="movieCBot-right-right" onMouseLeave={()=>{setIsBool(false);}} onMouseEnter={()=>{setIsBool(true);}}>
                                {isBool && 
                                    <div className="movieCBot-right-container movieCBot-right-top-container"
                                    >
                                        <motion.span className="material-icons md-green" 
                                        onClick={()=>{if(hasReaction === 1){
                                                if(react(1)){
                                                    setHasReaction(0);
                                                    setLikesC(likesC-1);}
                                            }else{if(react(1)){
                                                    if(hasReaction === 2){
                                                        setHatesC(hatesC-1)
                                                    }
                                                    setHasReaction(1);
                                                    setLikesC(likesC+1);}
                                            }setIsBool(false);}}
                                        initial={{ opacity: 0, scale: 0.5, y: 30, x: 30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0, x: 0}}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{
                                            type: "spring",
                                            duration: 0.2,
                                            delay: 0.1,
                                            ease: [0, 0.71, 0.2, 1.01],
                                            damping: 10,
                                            mass: 0.75,
                                            stiffness: 100
                                        }}>
                                            mood
                                        </motion.span>
                                        <motion.span className="material-icons md-red" 
                                        onClick={()=>{
                                            if(hasReaction === 2){if(react(2)){
                                                    setHasReaction(0);
                                                    setHatesC(hatesC-1);}
                                            }else{if(react(2)){
                                                    if(hasReaction === 1){
                                                        setLikesC(likesC-1);}
                                                    setHasReaction(2);
                                                    setHatesC(hatesC+1);}
                                            }setIsBool(false);}}
                                        initial={{ opacity: 0, scale: 0.5, y: 30, x: -30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0, x: 0}}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{
                                            type: "spring",
                                            duration: 0.2,
                                            delay: 0.1,
                                            ease: [0, 0.71, 0.2, 1.01],
                                            damping: 10,
                                            mass: 0.75,
                                            stiffness: 100
                                        }}>
                                            sentiment_very_dissatisfied
                                        </motion.span>
                                    </div>
                                }
                                {(hasReaction == 0) &&
                                        <motion.span className="movieCBot-right-container movieCBot-right-add material-icons"
                                        onMouseEnter={()=>{setIsBool(true);}}
                                        animate={{ rotate: 360 }}
                                        >
                                            add_reaction
                                        </motion.span>
                                }
                                {(hasReaction == 1) &&
                                        <motion.span className="movieCBot-right-container movieCBot-right-add material-icons md-green"
                                        onMouseEnter={()=>{setIsBool(true);}}
                                        animate={{ rotate: 360 }}
                                        onClick={()=>{react(1);setHasReaction(0);setLikesC(likesC-1)}}
                                        >
                                            mood
                                        </motion.span>
                                }
                                {(hasReaction == 2) &&
                                        <motion.span className="movieCBot-right-container movieCBot-right-add material-icons md-red"
                                        onMouseEnter={()=>{setIsBool(true);}}
                                        animate={{ rotate: 360 }}
                                        onClick={()=>{react(2);setHasReaction(0);setHatesC(hatesC-1)}}
                                        >
                                            sentiment_very_dissatisfied
                                        </motion.span>
                                }
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default MovieComponent;