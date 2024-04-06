import React from "react";
import "../assets/Popup.css";

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen){
    return null;
  }
  return (
    <div className="popup">
      <div className="popup-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
