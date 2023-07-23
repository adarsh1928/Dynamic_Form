import React from "react";

const Dropdown = ({ selectedOption, handleOptionChange, isSubmitting }) => {
  return (
    <label style={{ marginBottom: "10px" }}>
      <input
        type="radio"
        value="dropdown"
        checked={selectedOption === "dropdown"}
        onChange={handleOptionChange}
        disabled={isSubmitting}
      />
      Dropdown Input
    </label>
  );
};

export default Dropdown;