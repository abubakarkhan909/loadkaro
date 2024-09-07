import React,{useState} from 'react';
import './Tooltip.css'; 
import images from './../../images';

const Tooltip = ({ heading, image, text, listItems, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleTooltip = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseTooltip = () => {
        setIsOpen(false);
    };
    return (
        <div className={`tooltip-container ${isOpen ? 'active' : ''}`}>
            <div className="tooltip-icon" onClick={handleToggleTooltip}>
                
                <span className="tooltip-icon">
                    <img src={images.Question_mark}/>
                </span>
            </div>
            {isOpen && (
                <>
                    <div className="tooltip-overlay" onClick={handleCloseTooltip}></div>
                    <div className="tooltip-content">
                        {image && <img src={image} alt="Tooltip Image" className="tooltip-image" />}
                        {heading && <h4 className="tooltip-heading">{heading}</h4>}
                        {text && <p>{text}</p>}
                        {listItems && listItems.length > 0 && (
                            <>
                                <label>
                                    Notes:
                                </label>
                                <ul className="tooltip-list">
                                    {listItems.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Tooltip;
