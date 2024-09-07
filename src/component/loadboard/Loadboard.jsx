import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import CustomPagination from '../CustomPagination';
import './Loadboard.css';
import images from '../../images';

  Modal.setAppElement('#root'); 

// Dummy data
const dummyData = [
  {
    truckType: 'Flatbed',
    from: 'Karachi',
    to: 'Lahore',
    weight: 1000,
    address: '123 Main St',
    contact: '123-456-7890',
    date: new Date('2024-08-21')},{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')},{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')},{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')},{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'Refrigerated',
    from: 'Lahore',
    to: 'Islamabad',
    weight: 500,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },{
    truckType: 'test',
    from: 'farooqabad',
    to: 'faisalabad',
    weight: 1600,
    address: '456 Elm St',
    contact: '234-567-8901',
    date: new Date('2024-08-22')
  },
  // Add more dummy data as needed
];

function Loadboard() {
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
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedContact('');
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
  
  const paginationOptions = {
    rowsPerPageText: '',
    rangeSeparatorText: '',
    selectAllRowsItem: false,
    selectAllRowsItemText: '',
  };

  return (
    <div className='loadboardmain'>
      <div className='container'>
        <div className="search-inputs">
          <h4>Search</h4>
          <div className='inputsinner'>
            <div className='form-control'>
              <label>Truck Type</label>
              <input 
                type="text" 
                name="truckType" 
                placeholder="Truck Type" 
                value={filters.truckType} 
                onChange={handleInputChange} 
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
        <div className='loadboarddata'>
          <DataTable
            columns={columns}
            data={filteredData}
            paginationPerPage={5}
            pagination
            paginationComponent={CustomPagination}
            highlightOnHover
            responsive
          />
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Contact Information"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2 className='contact'>
            
            <a href={`tel:${selectedContact}`}>
              <span>
                <img src={images.phoneIcon}/>
              </span>
              {selectedContact}
              </a>
          </h2>
          <button className='btn btn-link close' onClick={closeModal}>X</button>
        </Modal>
      </div>
    </div>
  );
}

export default Loadboard;
