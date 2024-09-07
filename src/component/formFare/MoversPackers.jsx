import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateFormData, nextStep } from '../../store/formSlice'; 

function MoversPackers() {
  const dispatch = useDispatch();
  const { housetype, pickupfloor, dropfloor } = useSelector(state => state.form.formData);
  const error = useSelector(state => state.form.error); 
  const [houseTypes, setHouseTypes] = useState([]);
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    // Dummy data for house types
    const dummyHouseTypes = [
      { id: '1', name: 'Apartment' },
      { id: '2', name: 'Villa' },
      { id: '3', name: 'Bungalow' },
    ];

    // Dummy data for floors
    const dummyFloors = [
      { id: '1', name: 'Ground Floor' },
      { id: '2', name: 'First Floor' },
      { id: '3', name: 'Second Floor' },
    ];

    // Simulate fetching data
    setHouseTypes(dummyHouseTypes);
    setFloors(dummyFloors);
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
    
  };

  const handleNextStep = () => {
    dispatch(nextStep());
  };

  return (
    <div className="moverpacker ">
      <div className='heading'>
          <h4>Movers and Packers</h4>
          <p>Please provide house detail for moving the goods as per the given date.</p>
      </div>
      
      <div className="form-control">
        <select
          id="housetype"
          name="housetype"
          value={housetype}
          onChange={handleSelectChange}
        >
          <option value="" disabled>House Type</option>
          {houseTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div className="formcontrol_Parent">
        <div className="form-control">
          <select
            id="pickupfloor"
            name="pickupfloor"
            value={pickupfloor}
            onChange={handleSelectChange}
          >
            <option value="" disabled>Select Pickup Floor</option>
            {floors.map((floor) => (
              <option key={floor.id} value={floor.id}>{floor.name}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <select
            id="dropfloor"
            name="dropfloor"
            value={dropfloor}
            onChange={handleSelectChange}
          >
            <option value="" disabled>Select Drop Floor</option>
            {floors.map((floor) => (
              <option key={floor.id} value={floor.id}>{floor.name}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default MoversPackers;
