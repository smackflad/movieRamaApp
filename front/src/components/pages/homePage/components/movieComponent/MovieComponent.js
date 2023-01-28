import "./movieComponent.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'animate.css'

const MovieComponent = ({id, title, desc, nOuser, dOpublic, nOlikes, nOHates}) => {
  let navigate = useNavigate();
  const [hasReaction, setHasReaction] = useState(0);
  const [isBool, setIsBool] = useState(false);

  return (
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
                </div>
                {(!isBool && hasReaction == 0) &&
                    <div className="movieCBot-right movieCBot-right-add" onMouseEnter={()=>{setIsBool(true);}}>
                        <span className="material-icons">
                            add_reaction
                        </span>
                    </div>
                }
                {(!isBool && hasReaction == 1) &&
                    <div className="movieCBot-right movieCBot-right-add" onMouseEnter={()=>{setIsBool(true);}}>
                        <span className="material-icons md-green">
                            mood
                        </span>
                    </div>
                }
                {(!isBool && hasReaction == 2) &&
                    <div className="movieCBot-right movieCBot-right-add" onMouseEnter={()=>{setIsBool(true);}}>
                        <span className="material-icons md-red">
                            sentiment_very_dissatisfied
                        </span>
                    </div>
                }
                {isBool && 
                    <div className="movieCBot-right" onMouseLeave={()=>{setIsBool(false);}}>
                        <span className="material-icons md-green" onClick={()=>{if(hasReaction === 1){setHasReaction(0);}else{setHasReaction(1)}}}>
                            mood
                        </span>
                        <span className="material-icons md-red" onClick={()=>{if(hasReaction === 2){setHasReaction(0);}else{setHasReaction(2)}}}>
                            sentiment_very_dissatisfied
                        </span>
                    </div>
                }
            </div>
        </div>
    </div>
  );
};

export default MovieComponent;