import { useState } from 'react';
import '../ModalBase/ModalBase.css';
import './EditBasicInfoModal.css';
import userIcon from '../../../assets/Fowgate Folder/user-multiple-02.svg'; // Or any appropriate icon
import calendarIcon from '../../../assets/Fowgate Folder/calendar-03.svg';

export default function EditBasicInfoModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: 'Okonkwo Joshua',
    countryCode: '+234',
    mobileNumber: '810-589-4695',
    email: 'okonkwojoshua3@gmail.com',
    dob: '14 November, 1993',
    gender: 'Male',
    ssnType: 'National Identity Number'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="claim-modal edit-basic-info-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={userIcon} alt="User" className="claim-modal-title-icon" style={{ filter: 'brightness(0) invert(1)' }} />
            Edit basic info
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close">x</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-basic-info-form">
          <div className="hide-scrollbar edit-basic-info-scroll">
            
            <div className="edit-basic-info-field">
              <label>Full name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="edit-basic-info-input" 
              />
            </div>

            <div className="edit-basic-info-field">
              <label>Mobile number</label>
              <div className="edit-basic-info-mobile-group">
                <button type="button" className="edit-basic-info-country-code">
                  <div className="edit-basic-info-country-flag"></div>
                  {formData.countryCode}
                  <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <input 
                  type="text" 
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="edit-basic-info-mobile-input" 
                />
              </div>
            </div>

            <div className="edit-basic-info-field">
              <label>Email address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="edit-basic-info-input" 
              />
            </div>

            <div className="edit-basic-info-field">
              <label>Date of Birth</label>
              <div className="edit-basic-info-date-wrap">
                <div className="edit-basic-info-date-input">
                  {formData.dob}
                </div>
                <img src={calendarIcon} alt="Calendar" className="edit-basic-info-date-icon" />
              </div>
            </div>

            <div className="edit-basic-info-field">
              <label>Gender</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange}
                className="edit-basic-info-select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="edit-basic-info-field">
              <label>SSN Type</label>
              <select 
                name="ssnType" 
                value={formData.ssnType} 
                onChange={handleChange}
                className="edit-basic-info-select"
              >
                <option value="Select">Select</option>
                <option value="National Identity Number">National Identity Number</option>
                <option value="Passport">Passport</option>
                <option value="Driver's License">Driver's License</option>
              </select>
            </div>

          </div>

          <div className="claim-modal-actions">
            <button type="button" onClick={onClose} className="modal-btn-cancel" style={{ border: 'none', background: 'transparent' }}>Cancel</button>
            <button type="submit" className="modal-btn-submit">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}
