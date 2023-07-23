import React from "react";

function NormalInput({ selectedOption, handleOptionChange, isSubmitting }) {
  return (
    <label style={{ marginBottom: "10px" }}>
      <input
        type="radio"
        value="normal"
        checked={selectedOption === "normal"}
        onChange={handleOptionChange}
        disabled={isSubmitting}
      />
      Normal Input
    </label>
  );
}

export default NormalInput;
