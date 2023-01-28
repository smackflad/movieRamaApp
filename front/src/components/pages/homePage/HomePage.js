import "./homePage.css";
import mainLogo from "./../../../imgs/logoc.png";
import MovieComponent from "./components/movieComponent/MovieComponent";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'animate.css';
import { useAnimation, motion, delay } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  let navigate = useNavigate();
  const animationControls = useAnimation();
  async function sequence() {
    await animationControls.start({ scale: 1.5, transition: {delay: 0.5} });
    await animationControls.start({ scale: 0 });
    animationControls.start({
        opacity: 0,
        transitionEnd: {
          display: "none"
        }
      });
  }
  useEffect(()=>{
    sequence();
  });

  return (
    <div className="homePage-external">
        <motion.div className="homePage-logo"
            initial={{ scale: 1 }}
            animate={animationControls}
        >
            <img src={mainLogo} />
        </motion.div>
        <motion.div className="homePage-posts"
            initial={{ y: 100, opacity: 0, display: "none" }}
            animate={{ y: 0, opacity: 1, display: "flex" }}
            transition={{delay: 1.2, duration: 0.4}}
        >
        <MovieComponent
            id={5}
            title={"The Empire Strikes Back"}
            desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            nOuser={"Smackflad"}
            nOlikes={5}
            nOHates={3}
            />
        <MovieComponent
            id={5}
            title={"The Empire Strikes Back"}
            desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            nOuser={"Smackflad"}
            nOlikes={5}
            nOHates={3}
            />
        <MovieComponent
            id={5}
            title={"The Empire Strikes Back"}
            desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            nOuser={"Smackflad"}
            nOlikes={5}
            nOHates={3}
            />
        </motion.div>
    </div>
  );
};

export default HomePage;