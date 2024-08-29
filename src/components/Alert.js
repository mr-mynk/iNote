import React from "react";

export default function Alert(props) {
  const capitalize = (atype) => {
    const lower = atype.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: "20px",position:"fixed",right:'0',bottom:'50px',zIndex:"99"}}>
      {props.alert &&
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
      </div>}
    </div>
  );
}