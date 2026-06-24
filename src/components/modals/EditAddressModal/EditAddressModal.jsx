import { useState, useRef, useEffect } from 'react';
import '../ModalBase/ModalBase.css';
import './EditAddressModal.css';
import locationIcon from '../../../assets/Fowgate Folder/location.svg'; 
import arrowDownIcon from '../../../assets/Fowgate Folder/arrow-down-01.svg';

export default function EditAddressModal({ onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    address1: '',
    address2: '',
    postalCode: '90210'
  });

  // Dropdown states
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryRef.current && !countryRef.current.contains(e.target)) {
        setIsCountryOpen(false);
      }
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setIsStateOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'country') setIsCountryOpen(false);
    if (name === 'state') setIsStateOpen(false);
    if (name === 'city') setIsCityOpen(false);
  };

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
      <div className="claim-modal edit-address-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={locationIcon} alt="Location" className="claim-modal-title-icon" style={{ filter: 'brightness(0) invert(1)' }} />
            Edit address
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-address-form">
          <div className="hide-scrollbar edit-address-scroll">
            
            <div className="edit-address-field">
              <label>Country</label>
              <div className="edit-address-select-wrap" ref={countryRef}>
                <div 
                  className="edit-address-select-trigger"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                >
                  <span>{formData.country}</span>
                  <img src={arrowDownIcon} alt="dropdown arrow" className={`edit-address-select-arrow ${isCountryOpen ? 'is-open' : ''}`} />
                </div>
                
                {isCountryOpen && (
                  <div className="edit-address-dropdown-list">
                    {['United States', 'United Kingdom', 'Canada'].map(option => (
                      <div 
                        key={option}
                        className={`edit-address-dropdown-item ${formData.country === option ? 'is-selected' : ''}`}
                        onClick={() => handleSelectChange('country', option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="edit-address-field">
              <label>State/Province</label>
              <div className="edit-address-select-wrap" ref={stateRef}>
                <div 
                  className="edit-address-select-trigger"
                  onClick={() => setIsStateOpen(!isStateOpen)}
                >
                  <span>{formData.state}</span>
                  <img src={arrowDownIcon} alt="dropdown arrow" className={`edit-address-select-arrow ${isStateOpen ? 'is-open' : ''}`} />
                </div>
                
                {isStateOpen && (
                  <div className="edit-address-dropdown-list">
                    {['California', 'New York', 'Texas'].map(option => (
                      <div 
                        key={option}
                        className={`edit-address-dropdown-item ${formData.state === option ? 'is-selected' : ''}`}
                        onClick={() => handleSelectChange('state', option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="edit-address-field">
              <label>City</label>
              <div className="edit-address-select-wrap" ref={cityRef}>
                <div 
                  className="edit-address-select-trigger"
                  onClick={() => setIsCityOpen(!isCityOpen)}
                >
                  <span>{formData.city}</span>
                  <img src={arrowDownIcon} alt="dropdown arrow" className={`edit-address-select-arrow ${isCityOpen ? 'is-open' : ''}`} />
                </div>
                
                {isCityOpen && (
                  <div className="edit-address-dropdown-list">
                    {['San Francisco', 'Los Angeles', 'New York City', 'Houston'].map(option => (
                      <div 
                        key={option}
                        className={`edit-address-dropdown-item ${formData.city === option ? 'is-selected' : ''}`}
                        onClick={() => handleSelectChange('city', option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="edit-address-field">
              <label>Address Line 1</label>
              <input 
                type="text" 
                name="address1"
                placeholder="Enter primary address"
                value={formData.address1}
                onChange={handleChange}
                className="edit-address-input" 
              />
            </div>

            <div className="edit-address-field">
              <label>Address Line 2</label>
              <input 
                type="text" 
                name="address2"
                placeholder="Enter alternative address"
                value={formData.address2}
                onChange={handleChange}
                className="edit-address-input" 
              />
            </div>

            <div className="edit-address-field">
              <label>Postal Code</label>
              <input 
                type="text" 
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="edit-address-input" 
              />
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
