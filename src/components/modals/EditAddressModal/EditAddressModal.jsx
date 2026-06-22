import { useState } from 'react';
import '../ModalBase/ModalBase.css';
import './EditAddressModal.css';
import locationIcon from '../../../assets/Fowgate Folder/location.svg'; 

export default function EditAddressModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    country: 'United States',
    state: 'California',
    city: 'California',
    address1: '',
    address2: '',
    postalCode: '000-000'
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
      <div className="claim-modal edit-address-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={locationIcon} alt="Location" className="claim-modal-title-icon" style={{ filter: 'brightness(0) invert(1)' }} />
            Edit address
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close">x</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-address-form">
          <div className="hide-scrollbar edit-address-scroll">
            
            <div className="edit-address-field">
              <label>Country</label>
              <select 
                name="country" 
                value={formData.country} 
                onChange={handleChange}
                className="edit-address-select"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            <div className="edit-address-field">
              <label>State/Province</label>
              <select 
                name="state" 
                value={formData.state} 
                onChange={handleChange}
                className="edit-address-select"
              >
                <option value="California">California</option>
                <option value="New York">New York</option>
                <option value="Texas">Texas</option>
              </select>
            </div>

            <div className="edit-address-field">
              <label>City</label>
              <select 
                name="city" 
                value={formData.city} 
                onChange={handleChange}
                className="edit-address-select"
              >
                <option value="California">California</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="San Francisco">San Francisco</option>
              </select>
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
