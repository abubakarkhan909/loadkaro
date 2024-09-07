import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, nextPartialStep, nextStep, resetPartialStep,setError  } from './../../store/formSlice';
import Brands from '../brands/Brands';
import FewPacked from './FewPacked';
import MoversPackers from './MoversPackers';


function PartialOption() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData); 
  const partialStep = useSelector((state) => state.form.partialStep);
  const [localPartialStep, setLocalPartialStep] = useState(partialStep);
  const [selectedOption, setSelectedOption] = useState(formData.partialOption || '');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    dispatch(updateFormData({ partialOption: e.target.value })); 
    dispatch(resetPartialStep()); 
    dispatch(setError(''));
  };

  const handleNext = () => {
    if (!selectedOption) {
      alert('Please select an option.');
      return;
    }
    console.log("localPartialStep ",localPartialStep )
    console.log("partialStep1st",partialStep)
    console.log("selectedOption",selectedOption)
    if(partialStep>0 && selectedOption == "packedItems" ){
      if(formData.fewpackedmaterial.length == 0){
        dispatch(setError('Please add at least one list.'));
        return;
      }
    }
    if(partialStep>0 && selectedOption == "packerMover"){
      console.log("selectedOption packerMover")
      if (formData.housetype.length == 0 || formData.pickupfloor.length == 0 || formData.dropfloor.length == 0) {
        
        dispatch(setError('Please select all fields before proceeding.'));
        return;
      }
    }
    
    if (partialStep < getMaxPartialSteps(selectedOption)) {
      dispatch(nextPartialStep());
    } else {
      console.log("partialStep3",partialStep);
      dispatch(nextStep());
    }
  };

  const getMaxPartialSteps = (option) => {
    switch (option) {
      case 'packedItems':
        return 1; 
      case 'packerMover':
        return 1;
      default:
        return 1;
    }
  };

  return (
    <div className="step4Form innerformdiv">
      {partialStep === 0 && (
        <>
          <h4>Select partial option</h4>
          <div className='radioservice'>
            <label>
              <input
                type="radio"
                name="partialOption"
                value="packedItems"
                onChange={handleOptionChange}
                checked={selectedOption === 'packedItems'}
              />
              <div className='labeltextcontent'>
                <div className='textcontent'>
                  Few packed items (1-5)
                  <span>Non furniture items like boxes ,luggage,Appliances</span>
                </div>
              </div>
            </label>
          </div>
          <div className='radioservice'>
            <label>
              <input
                type="radio"
                name="partialOption"
                value="packerMover"
                onChange={handleOptionChange}
                checked={selectedOption === 'packerMover'}
              />
              <div className='labeltextcontent'>
                <div className='textcontent'>
                  Packers & Movers
                  <span>Includes Furnitures and complete house shifting</span>
                </div>
              </div>
            </label>
          </div>
        </>
      )}

      {partialStep > 0 && (
        <div className='option-content'>
          {selectedOption === 'packedItems' && partialStep === 1 && <FewPacked />}
          {selectedOption === 'packerMover' && partialStep === 1 && <MoversPackers />}
        </div>
      )}

      <div className='step-buttons'>
        <button className='btn btn-primary' type="button" onClick={handleNext}>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default PartialOption;