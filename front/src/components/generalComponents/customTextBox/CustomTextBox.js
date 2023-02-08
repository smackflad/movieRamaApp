import "./customTextBox.css";
import { useNavigate } from "react-router-dom";
import { useAnimation, motion, delay, AnimatePresence } from "framer-motion";

const CustomTextBox = ({keyy="", name="", disabled=false, isError=false, errorMessage="", required=false, value, change=()=>{}, blur=()=>{}, placeholder="", type="text"}) => {
    return (
    <div className="customTextBox-external">
        <motion.input 
            className={`customTextBox-txt ${isError ? "customTextBox-error":""}` } 
            type={type} placeholder={placeholder} required={required}
            key={keyy}
            id={name} name={name}
            disabled={disabled}
            value={value} onChange={change}
            onBlur={blur}

            initial={{ y: 100, opacity:0}}
            animate={{ y: 0, opacity:1}}
            transition={{
                delay: 0.2
            }}
        />
        {(isError) &&
            <span className="customTextBox-span">*{errorMessage}</span>
        }
    </div>
    );
};

export default CustomTextBox;