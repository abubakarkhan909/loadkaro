import React, { useState } from 'react';
import './LoadBoardCard.css';
import images from '../../images';

function LoadboardCarditem({ data }) {
  const [shownContacts, setShownContacts] = useState([]);
  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  const topItems = sortedData.slice(0, 3);

  const handleShowContact = (index) => {
    setShownContacts([...shownContacts, index]);
  };
  return (
    <div className='loadboardcarddata'>
      <div className='loadboardlist'>
        {topItems.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <div className='detialship'>
                <div className='location'>
                  <div className='from'>
                    <span>
                      <img src={images.fromloc}/>
                    </span>
                    <p>{item.from}</p>
                  </div>
                  <div className='to'>
                    <span>
                      <img src={images.toloc}/>
                    </span>
                    <p>{item.to}</p>
                  </div>
                </div>
                <div className='rightinfo'>
                  <div className='date'>
                    <span>
                      <img src={images.timer} />
                    </span>
                    <p>{item.date.toDateString()}</p>
                  </div>
                  <div className='weight'>
                    <p>{item.weight}</p>
                  </div>
                </div>
              </div>
              <div className='bottominfo'>
                <div className='truckinfo'>
                  <div className='trucktype'>
                    <span>
                      <img src={images.truckgray}/>
                    </span>
                    <p>
                      {item.truckType}
                    </p>
                  </div>
                </div>
                <div className='material'>
                  <span>
                    <img src={images.materialIcon}/>
                  </span>
                  <p>
                    {item.material}
                  </p>
                </div>
                <div className='address'>
                  <p><strong>Address:</strong> {item.address}</p>
                </div>
              </div>
              <div className='contactinfocard'>
                    {shownContacts.includes(index) ? (
                            <a className='contactnumber' href={`tel:${item.contact}`}>
                                <span>
                                    <img src={images.phoneIcon} alt="phone icon"/>
                                </span> 
                                {item.contact}
                            </a>
                    ) : (
                        <button onClick={() => handleShowContact(index)} className="">
                        Show Contact
                        </button>
                    )}
                    <button className='acceptbtn'>Accept</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadboardCarditem;
