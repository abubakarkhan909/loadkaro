import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import './MaterialPopup.css';

function MaterialPopup({ isOpen, onClose, onAddMaterial, editIndex, materialToEdit }) {
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [itemCount, setItemCount] = useState(1);
    const [error, setError] = useState('');

    // Dummy data
    const materials = ['Furniture', 'Agriculture', 'Electronics', 'Textiles', 'Metals'];

    // Pre-fill the form with materialToEdit if editing
    useEffect(() => {
        if (materialToEdit) {
            setSelectedMaterial(materialToEdit.material);
            setItemCount(materialToEdit.count);
        } else {
            setSelectedMaterial('');
            setItemCount(1);
        }
    }, [materialToEdit]);

    // Handle adding or updating the material
    const handleAddMaterial = () => {
        if (selectedMaterial && itemCount > 0) {
            onAddMaterial({ material: selectedMaterial, count: itemCount });
            // Reset the form and close the popup
            setSelectedMaterial('');
            setItemCount(1);
            setError('');
            onClose();
        } else {
            setError('Please select a material and enter a valid number of items.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className='materialpopup'>
            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <div className='pop-content-inner'>
                        <h4>{editIndex !== null ? 'Edit Material details' : 'Add material details'}</h4>
                        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                        <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
                            <option value="" disabled>Select Material</option>
                            {materials.map((material, index) => (
                                <option key={index} value={material}>{material}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={itemCount}
                            min="1"
                            onChange={(e) => setItemCount(e.target.value)}
                            placeholder="Number of Items"
                        />
                        
                        <button className="btn btn-primary" type="button" onClick={handleAddMaterial}>
                            {editIndex !== null ? 'Update' : 'Add'} <IoIosArrowForward />
                        </button>   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MaterialPopup;
