import "./popupMessage.css";
import { useNavigate } from "react-router-dom";
import { useAnimation, motion, delay, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PopupMessage = ({message, onTimeout}) => {
    const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (visible) {
      timeoutId = setTimeout(() => {
        setVisible(false);
        onTimeout();
      }, 5000);
      const intervalId = setInterval(() => {
        if (!paused) {
          setProgress(progress => progress + 1);
        }
      }, 50);
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [visible, onTimeout, paused]);

  const handleDismiss = () => {
    setVisible(false);
    onTimeout();
  };

  const handleHoverStart = () => {
    setPaused(true);
    progressWidth.stop();
  };

  const handleHoverEnd = () => {
    setPaused(false);
    progressWidth.set(0);
    progressWidth.set(1, { duration: 5, ease: "linear" });
  };

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  const progressVariants = {
    full: {
      width: "0%",
      transition: {
        duration: 5,
        ease: "linear",
      },
    },
    empty: {
      width: "100%",
    },
  };

  const progressWidth = useMotionValue(0);
  const progressTransform = useTransform(progressWidth, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (paused) {
      progressWidth.stop();
    } else {
      progressWidth.set(0);
      progressWidth.set(1, { duration: 5, ease: "linear" });
    }
  }, [paused, progressWidth]);

  return (
      <div className="popupMessage-external" onClick={handleDismiss}>
          <motion.div
            className="popupMessage-internal"
            style={{ opacity: 0 }}
            animate="visible"
            initial="hidden"
            variants={containerVariants}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
      >
          <div style={{ height: "5px" }}>
            <motion.div
                style={{
                    backgroundColor: "#333",
                    height: "100%",
                    width: "100%",
                }}
                variants={progressVariants}
                animate={paused ? "empty" : "full"}
            />
        </div>
                      <div className="popupMessage-txt">
                          <span className="popupMessage-error">
                              error
                          </span>
                          {message === 0 &&
                              <span>Internal server error</span>
                          }
                          {message === 1 &&
                              <span>The email or password dosen't match</span>
                          }
                          {message === 2 &&
                              <span>User does not exist</span>
                          }
                          {message === 3 &&
                              <span>Old password dosen't match</span>
                          }
                      </div>
          </motion.div>
      </div>
  );
};

export default PopupMessage;