import React from 'react';
import { IoIosArrowBack ,IoIosArrowForward} from "react-icons/io";

const CustomArrows = ({ onPrevClick, onNextClick, dots }) => {
  return (
    <div className="custom-arrows">
      <div className="arrow prev-arrow" onClick={onPrevClick}>
        <IoIosArrowBack style={{ color: 'black', fontSize: '17px' }} />
      </div>
      <div className="dots-container">
        {dots}
      </div>
      <div className="arrow next-arrow" onClick={onNextClick}>
        <IoIosArrowForward style={{ color: 'black', fontSize: '17px' }} />
      </div>
    </div>
  );
};

export default CustomArrows;
