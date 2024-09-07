import React, { useState } from 'react';
import './TruckTypeDropdown.css'; // Ensure you have the correct styles
import images from '../../images';

const truckTypes = [
  { value: 'LCV', name: 'LCV', image: `${images.half_body_truck}`,info: "7-50 ton" },
  { value: 'Truck', name: 'Truck', image: `${images.half_body_truck}`,info: "7-50 ton" },
  { value: 'Container', name: 'Container', image: `${images.half_body_truck}`,info: "7-50 ton" },
  { value: 'Trailer', name: 'Trailer', image: `${images.half_body_truck}`,info: "7-50 ton" },
  { value: 'Hyva', name: 'Hyva', image: `${images.half_body_truck}`,info: "7-50 ton" },
  { value: 'Tanker', name: 'Tanker', image: `${images.half_body_truck}`,info: "7-50 ton" }
];

function TruckTypeDropdown({ selectedTruckType, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (truckType) => {
    onSelect(truckType);
    setIsOpen(false);
  };

  return (
    <div className="truck-type-dropdown">
      <div 
        className="dropdown-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={truckTypes.find(type => type.value === selectedTruckType)?.image} alt="" className="selected-image" />
        <span>{truckTypes.find(type => type.value === selectedTruckType)?.name || 'Select Truck Type'}</span>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {truckTypes.map(type => (
            <div 
              key={type.value} 
              className={`dropdown-item ${type.value === selectedTruckType ? 'selected' : ''}`} 
              onClick={() => handleSelect(type.value)}
            >
              <div className='truckname'>
                <img src={type.image} alt={type.name} className="dropdown-item-image" />
                <span>{type.name}</span>
              </div>
              <div className='truckinfo'>
                {type.info}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TruckTypeDropdown;
