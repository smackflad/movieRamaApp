import "./movieComponent.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'animate.css'
import { useAnimation, motion, delay, AnimatePresence } from "framer-motion";

const MovieComponent = ({id, title, desc, nOuser, dOpublic, nOlikes, nOHates}) => {
  let navigate = useNavigate();
  const [hasReaction, setHasReaction] = useState(0);
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
                <div className="movieCBot-right-container" onMouseLeave={()=>{setIsBool(false);}}>
                    {isBool && 
                        <div className="movieCBot-right movieCBot-right-top"
                        >
                            <motion.span className="material-icons md-green" onClick={()=>{if(hasReaction === 1){setHasReaction(0);}else{setHasReaction(1)}setIsBool(false);}}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
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
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
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
                        <motion.div className="movieCBot-right movieCBot-right-add" onMouseEnter={()=>{setIsBool(true);}}
                        animate={{ rotate: 360 }}
                        >
                            <span className="material-icons">
                                add_reaction
                            </span>
                        </motion.div>
                    }
                    {(hasReaction == 1) &&
                        <motion.div className="movieCBot-right movieCBot-right-add" onMouseEnter={()=>{setIsBool(true);}}
                        animate={{ rotate: 360 }}
                        >
                            <span className="material-icons md-green">
                                mood
                            </span>
                        </motion.div>
                    }
                    {(hasReaction == 2) &&
                        <motion.div className="movieCBot-right movieCBot-right-add" onMouseEnter={()=>{setIsBool(true);}}
                        animate={{ rotate: 360 }}
                        >
                            <span className="material-icons md-red">
                                sentiment_very_dissatisfied
                            </span>
                        </motion.div>
                    }
                </div>
            </div>
        </div>
    </div>
  );
};

export default MovieComponent;