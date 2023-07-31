import "./customTextBox.css";
import { motion } from "framer-motion";

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
        />
        {(isError) &&
            <span className="customTextBox-span">*{errorMessage}</span>
        }
    </div>
    );
};

export default CustomTextBox;