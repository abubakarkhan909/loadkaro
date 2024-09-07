import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, nextStep } from '../../store/formSlice'; 
import MaterialPopup from './MaterialPopup';
import images from '../../images';

function FewPacked() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.formData);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const error = useSelector(state => state.form.error); 
   
    const handleAddMaterialClick = () => {
        setEditIndex(null);
        setIsPopupOpen(true);
    };
    const handleEditMaterialClick = (index) => {
        setEditIndex(index);
        setIsPopupOpen(true);
    };
    const handleMaterialAddOrUpdate = (materialEntry) => {
        if (editIndex !== null) {
            const updatedfewpackedmaterial = [...formData.fewpackedmaterial];
            updatedfewpackedmaterial[editIndex] = materialEntry;
            dispatch(updateFormData({ fewpackedmaterial: updatedfewpackedmaterial }));
        } else {
            dispatch(updateFormData({ fewpackedmaterial: [...formData.fewpackedmaterial, materialEntry] }));
        }
        setIsPopupOpen(false);
    };

    const handleRemoveMaterial = (index) => {
        dispatch(updateFormData({
            fewpackedmaterial: formData.fewpackedmaterial.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="stepmatForm fewpacked">
            <div className='heading'>
                <h4>Add material details</h4>
                <p>Add upto 20 material types with details and quality to proceed.</p>
            </div>
            <div className='materiallisted'>
                {formData.fewpackedmaterial.length > 0 && (
                    <div className="selected-materials">
                        <ul>
                            {formData.fewpackedmaterial.map((materialEntry, index) => (
                                <li key={index} className="selected-material-item">
                                    <div className='materialname'> 
                                        {materialEntry.material}
                                    </div>
                                     <div className='buttons'>
                                        <button onClick={() => handleEditMaterialClick(index)}>
                                            <img src={images.editIcon}/>
                                        </button>
                                        <button onClick={() => handleRemoveMaterial(index)}>
                                            <img src={images.deleteIcon} />
                                        </button>
                                     </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button className='btn btn-primary w-100' onClick={handleAddMaterialClick}>
                    <span>+</span> Add Material {formData.fewpackedmaterial.length > 0 && formData.fewpackedmaterial.length + 1}
                </button>
                
                {error && <p className="error mt-3">{error}</p>}
            </div>
            <MaterialPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onAddMaterial={handleMaterialAddOrUpdate}
                editIndex={editIndex}
                materialToEdit={editIndex !== null ? formData.fewpackedmaterial[editIndex] : null}
            />
        </div>
    );
}

export default FewPacked