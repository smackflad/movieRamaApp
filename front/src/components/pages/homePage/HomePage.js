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

  
  const container = {
    show: {
      opacity: 1,
      transition: {
        // delay: 5,
        type: "spring",
        bounce: 0,
        duration: 0.4,
        delayChildren: 1.5,
        staggerChildren: 0.1
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3
      }
    }
};
const item = {
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  hidden: { opacity: 0, y: -60, transition: { duration: 0.2 } }

    
};

return (
  <div className="homePage-external">
    <motion.div className="homePage-logo"
        initial={{ scale: 1 }}
        animate={animationControls}
    >
      <img src={mainLogo} />
    </motion.div>
    <motion.div
      className="homePage-posts"
        variants={container}
        initial="hidden"
        animate="show"
    >
        <motion.div variants={item}>
        <MovieComponent
            id={5}
            title={"The Empire Strikes Back"}
            desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            nOuser={"Smackflad"}
            nOlikes={5}
            nOHates={3}
            isLiked={0}
            />
        </motion.div>
        <motion.div variants={item}>
        <MovieComponent
            id={5}
            title={"The Empire Strikes Back"}
            desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            nOuser={"Smackflad"}
            nOlikes={5}
            nOHates={3}
            isLiked={1}
            />
        </motion.div>
        <motion.div variants={item}>
        <MovieComponent
            id={5}
            title={"The Empire Strikes Back"}
            desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            nOuser={"Smackflad"}
            nOlikes={5}
            nOHates={3}
            isLiked={2}
            />
        </motion.div>
        <motion.div variants={item}>
          <MovieComponent
            id={5}
            title={"The Empire Strikes Back"}
            desc={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            nOuser={"Smackflad"}
            nOlikes={5}
            nOHates={3}
            isLiked={0}
            />
        </motion.div>
    </motion.div>
  </div>
  );
};

export default HomePage;