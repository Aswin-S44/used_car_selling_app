import React from "react";

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        class="spinner-border mt-5"
        role="status"
        style={{ color: "orange" }}
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
