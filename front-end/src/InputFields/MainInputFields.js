import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import PageForTakingInputFromUser from './PageForTakingInputFromUser';
import Header from '../Header/Header';
import Dropdown from './DropDown';
import FileInput from './FileInput';
import NormalInput from './NormalInput';
import DropDownOption from './DropDownOption';
import RadioInput from './RadioInput';
import RadioInputOptions from './RadioInputOptions';

export default function MainInputFields() {

    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState("");
    const [inputList, setInputList] = useState([]);
    const [labelName, setLabelName] = useState("");
    const [optionValue, setOptionValue] = useState("");
    const [optionsList, setOptionsList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);


    function handleSubmit(e) {
        // e.preventDefault();


        setIsSubmitting(false);

        let inputListString = JSON.stringify(inputList);

        navigate("/PageForTakingInputFromUser", {
            state: { inputList: inputListString }
        })
    }

    const handleOptionChange = (event) => {
        if (!isSubmitting) {
            setSelectedOption(event.target.value);
        }
    };


    const handleDeleteClick = (id) => {
        const updatedList = inputList.filter((input) => input.id !== id);
        setInputList(updatedList);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { id: uuidv4(), type: selectedOption, label: labelName, options: optionsList }]);
        setLabelName("");
        setOptionsList([]);
    };

    const handleLabelChange = (event) => {
        setLabelName(event.target.value);
    };

    const handleOptionInputChange = (event) => {
        setOptionValue(event.target.value);
    }

    const handleAddOptionClick = () => {
        setOptionsList([...optionsList, optionValue]);
        setOptionValue("");
    };

    const handleDeleteOptionClick = (index) => {
        const updatedList = [...optionsList];
        updatedList.splice(index, 1);
        setOptionsList(updatedList);
    };

    return (
        <>

            <Header />
            <div style={{ marginTop: "150px", marginLeft: "90vh" }} >
                <h3>Choose input types</h3>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", fontSize: "20px" }}>

                        <FileInput
                            selectedOption={selectedOption}
                            handleOptionChange={handleOptionChange}
                            isSubmitting={isSubmitting}
                        />

                        <Dropdown
                            selectedOption={selectedOption}
                            handleOptionChange={handleOptionChange}
                            isSubmitting={isSubmitting}
                        />

                        <NormalInput
                            selectedOption={selectedOption}
                            handleOptionChange={handleOptionChange}
                            isSubmitting={isSubmitting}
                        />
                        <RadioInput
                            selectedOption={selectedOption}
                            handleOptionChange={handleOptionChange}
                            isSubmitting={isSubmitting}
                        />



                    </div>

                    <button style={{ marginLeft: "50px", marginTop: "20px", marginBottom: "30px", fontSize: "20px" }} type="submit" disabled={isSubmitting}>Final Submit</button>
                </form>

                {selectedOption && (

                    <div>

                        <label style={{ marginBottom: "35px", fontSize: "17px" }}>
                            Label :
                            <input style={{ marginLeft: "20px", marginRight: "15px", fontSize: "18px" }} type="text" value={labelName} onChange={handleLabelChange} />
                        </label>

                        {selectedOption === "dropdown" && (

                            <DropDownOption
                                setOptionsList={setOptionsList}
                                optionValue={optionValue}
                                handleOptionInputChange={handleOptionInputChange}
                                handleAddOptionClick={handleAddOptionClick}
                                optionsList={optionsList}
                                handleDeleteOptionClick={handleDeleteOptionClick}
                            />
                        )}
                        {
                            selectedOption === "radio" && (
                                <RadioInputOptions
                                    setOptionsList={setOptionsList}
                                    optionValue={optionValue}
                                    handleOptionInputChange={handleOptionInputChange}
                                    handleAddOptionClick={handleAddOptionClick}
                                    optionsList={optionsList}
                                    handleDeleteOptionClick={handleDeleteOptionClick} />
                            )
                        }
                    </div>
                )}

                {selectedOption && (
                    <button style={{ marginTop: "20px", marginLeft: "30px", fontSize: "17px" }} onClick={handleAddClick}>
                        Add
                    </button>
                )}


            </div>
            <div>
                {inputList.map((input) => {
                    return (
                        <div key={input.id}>
                            <label style={{ margin: "10px", fontSize: "18px" }}>{input.label}:</label>
                            {input.type === "file" && <input type="file" />}
                            {input.type === "dropdown" && (
                                <select style={{ fontSize: "17px" }}>
                                    {input.options.map((option) => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </select>
                            )}
                            {input.type === "radio" && (
                                <div>
                                    {input.options.map((option) => (
                                        <div key={option}>
                                            <input
                                                type="radio"
                                                id={option}
                                                value={option}
                                                checked={selectedOption === option}
                                                onChange={handleOptionChange}
                                                disabled={isSubmitting}
                                            />
                                            <label htmlFor={option}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {input.type === "normal" && <input type="text" />}
                            <button style={{ marginLeft: "50px", marginTop: "20px", marginBottom: "30px", fontSize: "15px" }} onClick={() => handleDeleteClick(input.id)}>Delete</button>




                        </div>
                    );
                })}
            </div>


        </>
    );
}
