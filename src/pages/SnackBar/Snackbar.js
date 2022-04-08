import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./Snackbar.css";

const Snackbar = forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    },
  }));
  return (
    <div
      className="snackbar"
      id={showSnackbar ? "show" : "hide"}
      style={{
        backgroundColor: props.type === "success" ? "#00FF89" : "#ff0048",
        color: props.type === "success" ? "rgb(46, 46, 46)" : "white",
      }}
    >
      <div className="symbol">
        {props.type === "success" ? <span className='faicon'><i className="fa fa-check"></i></span> : <span className='faicon'><i className="fa fa-exclamation-triangle"></i></span>}
      </div>
      <div className="message">{props.message}</div>
    </div>
  );
});

export default Snackbar;
