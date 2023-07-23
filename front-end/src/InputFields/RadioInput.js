import React from 'react';

export default function RadioInput({ selectedOption, handleOptionChange, isSubmitting }) {
  return (
    <div>
      <input
        type="radio"
        value="radio"
        checked={selectedOption === "radio"}
        onChange={handleOptionChange} // Corrected attribute name to `onChange`
        disabled={isSubmitting}
      />
      Radio Input
    </div>
  );
}
