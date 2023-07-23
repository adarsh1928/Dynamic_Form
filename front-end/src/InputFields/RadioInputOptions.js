import React from 'react';

export default function RadioInputOptions({
  setOptionsList,
  optionValue,
  handleOptionInputChange,
  handleAddOptionClick,
  optionsList,
  handleDeleteOptionClick
}) {
  return (
    <div>
      <label style={{ fontSize: "17px" }}>
        Option Value:
        <input
          style={{ margin: "20px", fontSize: "18px" }}
          type="text"
          value={optionValue}
          onChange={handleOptionInputChange}
        />
      </label>

      <button style={{ fontSize: "17px" }} onClick={handleAddOptionClick}>
        Add Option
      </button>

      {optionsList.map((option, index) => (
        <div key={index}>
          <label style={{ fontSize: "17px" }}>
            Option {index + 1}:
            <input
              style={{ margin: "8px", fontSize: "18px" }}
              type="text"
              value={option}
              onChange={(e) => {
                const updatedList = [...optionsList];
                updatedList[index] = e.target.value;
                setOptionsList(updatedList);
              }}
            />
          </label>
          <button onClick={() => handleDeleteOptionClick(index)}>
            Delete Option
          </button>
        </div>
      ))}
    </div>
  );
}
