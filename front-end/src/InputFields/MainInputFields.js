import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import PageForTakingInputFromUser from './PageForTakingInputFromUser';
import Header from '../Header/Header';

export default function MainInputFields() {

    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState("");
    const [inputList, setInputList] = useState([]);
    const [labelName, setLabelName] = useState("");
    const [optionValue, setOptionValue] = useState("");
    const [optionsList, setOptionsList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

 
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
       
        setIsSubmitting(false);
      
       let inputListString=JSON.stringify(inputList);

        navigate("/PageForTakingInputFromUser",{
            state:{inputList:inputListString}
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
                    </div>
                    <button style={{ marginLeft: "50px", marginTop: "20px", marginBottom: "30px", fontSize: "20px" }} type="submit" disabled={isSubmitting}>Final Submit</button>
                </form>
                {selectedOption && (
                    <div>
                        <label style={{ marginBottom: "35px", fontSize: "17px" }}>
                            Label :
                            <input style={{ marginLeft: "20px", marginRight: "15px" ,fontSize:"18px" }} type="text" value={labelName} onChange={handleLabelChange} />
                        </label>
                        {selectedOption === "dropdown" &&
                            <div>
                                <label style={{ fontSize: "17px" }} >
                                    Option Value:
                                    <input style={{ margin: "20px", fontSize: "18px" }} type="text" value={optionValue} onChange={handleOptionInputChange} />
                                </label>
                                <button style={{fontSize:"17px"}} onClick={handleAddOptionClick}>Add Option</button>
                                {optionsList.map((option, index) => (
                                    <div key={index}>
                                        <label style={{ fontSize: "17px" }}>
                                            option {index + 1}:
                                            <input style={{ margin: "8px", fontSize: "18px" }} type="text" value={option} onChange={(e) => {
                                                const updatedList = [...optionsList];
                                                updatedList[index] = e.target.value;
                                                setOptionsList(updatedList);
                                            }} />
                                        </label>
                                        <button  onClick={() => handleDeleteOptionClick(index)}>Delete Option</button>
                                    </div>
                                ))}
                            </div>
                        }
                        <button style={{marginTop:"20px", marginLeft: "30px", fontSize: "17px" }} onClick={handleAddClick}>Add</button>
                    </div>
                )}
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
                                {input.type === "normal" && <input type="text" />}
                                <button style={{ marginLeft: "50px", marginTop: "20px", marginBottom: "30px", fontSize: "15px" }}  onClick={() => handleDeleteClick(input.id)}>Delete</button>
                            </div>
                        );
                    })}
                </div>

            </div>
        </>
    );
}
