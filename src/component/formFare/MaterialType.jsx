import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, nextStep } from '../../store/formSlice'; // Adjust the import path as needed

function MaterialType() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.formData);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const materials = ['Furniture', 'Agriculture', 'Electronics', 'Textiles', 'Metals'];

    // Filter materials based on the input value
    const filteredMaterials = materials.filter(material =>
        material.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Handle input value change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle selection of a material from the filtered list
    const handleMaterialSelect = (material) => {
        if (!formData.cargoType.includes(material)) {
            dispatch(updateFormData({ cargoType: [...formData.cargoType, material] }));
            setInputValue(''); 
            setError('');
        }
    };

    // Handle removal of a selected material
    const handleRemoveMaterial = (material) => {
        dispatch(updateFormData({
            cargoType: formData.cargoType.filter(item => item !== material)
        }));
    };

    // Proceed to the next step after validation
    const handleNextStep = () => {
        if (formData.cargoType.length === 0) {
            setError('Please select at least one material type.');
        } else {
            setError('');
            dispatch(nextStep()); // Use dispatch to move to the next step
        }
    };

    return (
        <div className="step4Form innerformdiv">
            <h4>Enter material type</h4>
            <div className='inputswe'>
                {formData.cargoType.length > 0 && (
                    <div className="selected-materials">
                        <ul>
                            {formData.cargoType.map((material, index) => (
                                <li key={index} className="selected-material-item">
                                    {material}
                                    <button onClick={() => handleRemoveMaterial(material)}>×</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className='inuputlabeli bglight w-100'>
                    <label>Material name</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type here"
                    />
                    {inputValue && (
                        <div className='cityList material-list'>
                            <ul>
                                {filteredMaterials.map((material, index) => (
                                    <li key={index} onClick={() => handleMaterialSelect(material)}>
                                        <div className="details">
                                            <span className="title"> {material}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className='step-buttons'>
                <button className="btn btn-primary" type="button" onClick={handleNextStep}>
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    );
}

export default MaterialType;
