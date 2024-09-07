import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import TruckTypeDropdown from './TruckTypeDropdown';
import './LoadBoardCard.css';
import images from '../../images';
import dummyData from './../dummyDatacard'

Modal.setAppElement('#root');



function LoadboardCard() {
  const [shownContacts, setShownContacts] = useState([]);
  const [data] = useState(dummyData);
  const [filteredData, setFilteredData] = useState(dummyData);
  const [filters, setFilters] = useState({
    truckType: '',
    from: '',
    to: '',
    weight: '',
    date: null
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');
 // Pagination state
  const [visibleCount, setVisibleCount] = useState(3);


  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setFilters({
      ...filters,
      date: date
    });
  };

  const handleTruckTypeSelect = (truckType) => {
    setFilters({
      ...filters,
      truckType: truckType
    });
  };

  const handleSearch = () => {
    let filtered = data.filter(item => {
      return (
        (filters.truckType === '' || item.truckType.toLowerCase().includes(filters.truckType.toLowerCase())) &&
        (filters.from === '' || item.from.toLowerCase().includes(filters.from.toLowerCase())) &&
        (filters.to === '' || item.to.toLowerCase().includes(filters.to.toLowerCase())) &&
        (filters.weight === '' || item.weight.toString().includes(filters.weight)) &&
        (filters.date === null || item.date.toDateString() === filters.date.toDateString())
      );
    });
    setFilteredData(filtered);
    setVisibleCount(3); 
  };

  const handleReset = () => {
    setFilters({
      truckType: '',
      from: '',
      to: '',
      weight: '',
      date: null
    });
    setFilteredData(data);
    setVisibleCount(3)
  };
  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };
  const handleShowContact = (index) => {
    setShownContacts([...shownContacts, index]);
  };

  const columns = [
    { name: 'Truck Type', selector: row => row.truckType, sortable: true },
    { name: 'From', selector: row => row.from, sortable: true },
    { name: 'To', selector: row => row.to, sortable: true },
    { name: 'Weight', selector: row => row.weight, sortable: true },
    { name: 'Address', selector: row => row.address },
    {
      name: 'Contact',
      cell: row => (
        <button onClick={() => openModal(row.contact)} className="btn btn-outline-primary findcontact">
          Show Contact
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: 'Date', selector: row => row.date.toDateString(), sortable: true },
  ];
  
  const hasMoreData = filteredData.length > visibleCount;

  return (
    <div className='loadboardmain'>
      <div className='container'>
        <div className="search-inputs">
          <h4>Search</h4>
          <div className='inputsinner'>
            <div className='form-control'>
              <label>Truck Type</label>
              <TruckTypeDropdown 
                selectedTruckType={filters.truckType}
                onSelect={handleTruckTypeSelect}
              />
            </div>
            <div className='form-control'>
              <label>From</label>
              <input 
                type="text" 
                name="from" 
                placeholder="From" 
                value={filters.from} 
                onChange={handleInputChange} 
              />
            </div>
            <div className='form-control'>
              <label>To</label>
              <input 
                type="text" 
                name="to" 
                placeholder="To" 
                value={filters.to} 
                onChange={handleInputChange} 
              />
            </div>
            <div className='form-control'>
              <label>Load Size</label>
              <input 
                type="text" 
                name="weight" 
                placeholder="Weight" 
                value={filters.weight} 
                onChange={handleInputChange} 
              />
            </div>
            <div className='form-control'>
              <label>Date</label>
              <DatePicker 
                selected={filters.date} 
                onChange={handleDateChange} 
                placeholderText="Select Date"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          <div className='buttons'>
            <button className='btn btn-primary' onClick={handleSearch}>Search</button>
            <button className='btn reset' onClick={handleReset}>
              <img src={images.refreshIcon} alt="reset"/>
            </button>
          </div>
        </div>
        <div className='loadboardcarddata'>
          {filteredData.length > 0 ? (
            <div className='loadboardlist'>
              
                {filteredData.slice(0, visibleCount).map((item, index) => (
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
          ): (
            <div className='no-results'>
              <p className='text-center mt-3'>No results found</p>
            </div>
          )}
          <div className='loadmore'>
            {hasMoreData && (
              <button className="btn btn-primary load-more" onClick={loadMore}>
                Load More
              </button>
            )}
          </div>
        </div>
     
      </div>
    </div>
  );
}


export default LoadboardCard