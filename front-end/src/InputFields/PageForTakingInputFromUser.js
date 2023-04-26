

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const initialFormData = {};



const PageForTakingInputFromUser = () => {
    const [formDataValues, setFormDataValues] = useState(initialFormData);
    let { state } = useLocation();

    let inputTypes = state.inputList
    let formData = JSON.parse(inputTypes)

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormDataValues((prevFormDataValues) => ({
            ...prevFormDataValues,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formDataValues);
        alert("Please see the console ")
    };

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Please Enter/Select the Inputs</h2>
            <form style={{ marginTop: "150px", marginLeft: "650px" }} onSubmit={handleSubmit}>
                {formData.map((field) => {
                    if (field.type === "file") {
                        return (
                            <div key={field.id}>
                                <label >{field.label}</label>
                                <input style={{ margin: "25px", fontSize: "15px" }} type="file" name={field.label} onChange={handleChange} />
                            </div>
                        );
                    }
                    if (field.type === "dropdown") {
                        return (
                            <div key={field.id}>
                                <label >{field.label}</label>
                                <select style={{ margin: "25px", fontSize: "15px" }} name={field.label} onChange={handleChange}>
                                    {field.options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    }
                    if (field.type === "normal") {
                        return (
                            <div key={field.id}>
                                <label  >{field.label}</label>
                                <input style={{ margin: "25px", fontSize: "15px" }} type="text" name={field.label} onChange={handleChange} />
                            </div>
                        );
                    }
                    return null;
                })}
                <button style={{ marginTop: "30px" }} type="submit">Submit</button>
            </form>

        </>
    );
};

export default PageForTakingInputFromUser;

