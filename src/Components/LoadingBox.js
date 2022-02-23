import React from "react";

function LoadingBox() {
  return (
    <div style={{ display: "block" }}>
      <i className="fa fa-spinner fa-spin"></i>
      <span>Loading...</span>
    </div>
  );
}

export default LoadingBox;
