import "./movieComponent.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fadeIn, fadeOut } from 'react-animations'

const MovieComponent = ({id, title, desc, nOuser, dOpublic, nOlikes, nOHates}) => {
  let navigate = useNavigate();

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
                <div className="movieCBot-right">
                    <span className="material-icons">
                        add_reaction
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MovieComponent;