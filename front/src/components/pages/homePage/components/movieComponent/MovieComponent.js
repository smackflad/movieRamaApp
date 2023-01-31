import "./movieComponent.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'animate.css'
import { useAnimation, motion, delay, AnimatePresence } from "framer-motion";

const MovieComponent = ({id, title, desc, nOuser, dOpublic, nOlikes, nOHates, isLiked}) => {
  let navigate = useNavigate();
  const [hasReaction, setHasReaction] = useState(isLiked);
  const [isBool, setIsBool] = useState(false);


  return (
    <div className="MovieComponent-external"
    
    >
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
                </div>
                <div className="movieCBot-right">
                    <div className="movieCBot-right-left">
                        <span>{isLiked === 1 && "You and "} {nOlikes} liked it!</span>
                        <span>{isLiked === 2 && "You and "} {nOHates} hated it!</span>
                    </div>
                    <div className="movieCBot-right-right" onMouseLeave={()=>{setIsBool(false);}}>
                        {isBool && 
                            <div className="movieCBot-right-container movieCBot-right-top-container"
                            >
                                <motion.span className="material-icons md-green" onClick={()=>{if(hasReaction === 1){setHasReaction(0);}else{setHasReaction(1)}setIsBool(false);}}
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
                                <motion.span className="material-icons md-red" onClick={()=>{if(hasReaction === 2){setHasReaction(0);}else{setHasReaction(2)}setIsBool(false);}}
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
                                onClick={()=>{setHasReaction(0)}}
                                >
                                    mood
                                </motion.span>
                        }
                        {(hasReaction == 2) &&
                                <motion.span className="movieCBot-right-container movieCBot-right-add material-icons md-red"
                                onMouseEnter={()=>{setIsBool(true);}}
                                animate={{ rotate: 360 }}
                                onClick={()=>{setHasReaction(0)}}
                                >
                                    sentiment_very_dissatisfied
                                </motion.span>
                        }
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default MovieComponent;