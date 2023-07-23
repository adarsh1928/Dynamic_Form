import React from "react";

const FileInput = ({ selectedOption, handleOptionChange, isSubmitting }) => {
  return (
    <label style={{ marginBottom: "10px" }}>
      <input
        type="radio"
        value="file"
        checked={selectedOption === "file"}
        onChange={handleOptionChange}
        disabled={isSubmitting}
      />
      File Input
    </label>
  );
};

export default FileInput;
