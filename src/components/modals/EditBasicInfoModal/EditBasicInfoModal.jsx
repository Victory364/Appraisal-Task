import { useState, useRef, useEffect } from 'react';
import '../ModalBase/ModalBase.css';
import './EditBasicInfoModal.css';
import userIcon from '../../../assets/Fowgate Folder/edit-user-02.svg'; // Or any appropriate icon
import calendarIcon from '../../../assets/Fowgate Folder/calendar-03.svg';
import arrowDownIcon from '../../../assets/Fowgate Folder/arrow-down-01.svg'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const parseDOB = (dobStr) => {
  if (!dobStr) return new Date();
  const parts = dobStr.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-based
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return new Date();
};

export default function EditBasicInfoModal({ onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: initialData?.countryCode || '+234',
    mobileNumber: '',
    email: '',
    dob: '',
    gender: initialData?.gender || 'Male',
    ssnType: initialData?.ssnType || 'National Identity Number'
  });

  // Calendar states
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(() => {
    return parseDOB(initialData?.dob || '08-05-2002');
  });

  const calendarRef = useRef(null);
  const dateInputRef = useRef(null);
  const dateIconRef = useRef(null);

  // Dropdown states
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isSsnTypeOpen, setIsSsnTypeOpen] = useState(false);

  const genderRef = useRef(null);
  const ssnTypeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarRef.current && !calendarRef.current.contains(e.target) &&
        dateInputRef.current && !dateInputRef.current.contains(e.target) &&
        dateIconRef.current && !dateIconRef.current.contains(e.target)
      ) {
        setIsCalendarOpen(false);
      }
      if (genderRef.current && !genderRef.current.contains(e.target)) {
        setIsGenderOpen(false);
      }
      if (ssnTypeRef.current && !ssnTypeRef.current.contains(e.target)) {
        setIsSsnTypeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCalendarDate(prev => new Date(newYear, prev.getMonth(), 1));
  };

  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // Sunday is 0, Saturday is 6
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleSelectDay = (day) => {
    if (!day) return;
    const year = calendarDate.getFullYear();
    const month = (calendarDate.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const formattedDate = `${dayStr}-${month}-${year}`;
    
    setFormData(prev => ({ ...prev, dob: formattedDate }));
    setIsCalendarOpen(false);
  };

  const isSelectedDate = (day) => {
    if (!day) return false;
    const currentSelected = parseDOB(formData.dob || initialData?.dob || '08-05-2002');
    return currentSelected.getFullYear() === calendarDate.getFullYear() &&
           currentSelected.getMonth() === calendarDate.getMonth() &&
           currentSelected.getDate() === day;
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1900; y--) {
    years.push(y);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'gender') setIsGenderOpen(false);
    if (name === 'ssnType') setIsSsnTypeOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        fullName: formData.fullName.trim() !== '' ? formData.fullName.trim() : (initialData?.fullName || 'Adewale Fayemi'),
        countryCode: formData.countryCode,
        mobileNumber: formData.mobileNumber.trim() !== '' ? formData.mobileNumber.trim() : (initialData?.mobileNumber || '810-589-4695'),
        email: formData.email.trim() !== '' ? formData.email.trim() : (initialData?.email || 'adewalefayemi10@gmail.com'),
        dob: formData.dob.trim() !== '' ? formData.dob.trim() : (initialData?.dob || '08-05-2002'),
        gender: formData.gender,
        ssnType: formData.ssnType
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="claim-modal edit-basic-info-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={userIcon} alt="User" className="claim-modal-title-icon" style={{ filter: 'brightness(0) invert(1)' }} />
            Edit basic info
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-basic-info-form">
          <div className="hide-scrollbar edit-basic-info-scroll">
            
            <div className="edit-basic-info-field">
              <label>Full name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                placeholder={initialData?.fullName || 'Adewale Fayemi'}
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
                  placeholder={initialData?.mobileNumber || '810-589-4695'}
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
                placeholder={initialData?.email || 'adewalefayemi10@gmail.com'}
                onChange={handleChange}
                className="edit-basic-info-input" 
              />
            </div>

            <div className="edit-basic-info-field">
              <label>Date of Birth</label>
              <div className="edit-basic-info-date-wrap">
                <input 
                  ref={dateInputRef}
                  type="text" 
                  name="dob"
                  value={formData.dob}
                  placeholder={initialData?.dob || '08-05-2002'}
                  onChange={handleChange}
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  readOnly
                  className="edit-basic-info-date-input" 
                />
                <img 
                  ref={dateIconRef}
                  src={calendarIcon} 
                  alt="Calendar" 
                  className="edit-basic-info-date-icon" 
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  style={{ cursor: 'pointer' }}
                />

                {isCalendarOpen && (
                  <div ref={calendarRef} className="dob-calendar-dropdown" onClick={(e) => e.stopPropagation()}>
                    <div className="dob-calendar-header">
                      <div className="dob-calendar-month-nav">
                        <button type="button" onClick={handlePrevMonth} className="dob-calendar-nav-btn">&lt;</button>
                        <span className="dob-calendar-month-name">{monthNames[calendarDate.getMonth()]}</span>
                        <button type="button" onClick={handleNextMonth} className="dob-calendar-nav-btn">&gt;</button>
                      </div>
                      <select 
                        value={calendarDate.getFullYear()} 
                        onChange={handleYearChange}
                        className="dob-calendar-year-select"
                      >
                        {years.map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    <div className="dob-calendar-weekdays">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((wd, index) => (
                        <div key={`${wd}-${index}`}>{wd}</div>
                      ))}
                    </div>

                    <div className="dob-calendar-days">
                      {getCalendarDays(calendarDate).map((day, index) => (
                        day === null ? (
                          <div key={`empty-${index}`} className="dob-calendar-empty" />
                        ) : (
                          <button
                            key={`day-${day}`}
                            type="button"
                            onClick={() => handleSelectDay(day)}
                            className={`dob-calendar-day-btn ${isSelectedDate(day) ? 'is-selected' : ''}`}
                          >
                            {day}
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="edit-basic-info-field">
              <label>Gender</label>
              <div className="edit-basic-info-select-wrap" ref={genderRef}>
                <div 
                  className="edit-basic-info-select-trigger"
                  onClick={() => setIsGenderOpen(!isGenderOpen)}
                >
                  <span>{formData.gender || 'Male'}</span>
                  <img src={arrowDownIcon} alt="dropdown arrow" className={`edit-basic-info-select-arrow ${isGenderOpen ? 'is-open' : ''}`} />
                </div>
                
                {isGenderOpen && (
                  <div className="edit-basic-info-dropdown-list">
                    {['Male', 'Female', 'Prefer not to say'].map(option => (
                      <div 
                        key={option}
                        className={`edit-basic-info-dropdown-item ${formData.gender === option ? 'is-selected' : ''}`}
                        onClick={() => handleSelectChange('gender', option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="edit-basic-info-field">
              <label>SSN Type</label>
              <div className="edit-basic-info-select-wrap" ref={ssnTypeRef}>
                <div 
                  className="edit-basic-info-select-trigger"
                  onClick={() => setIsSsnTypeOpen(!isSsnTypeOpen)}
                >
                  <span>{formData.ssnType || 'National Identity Number'}</span>
                  <img src={arrowDownIcon} alt="dropdown arrow" className={`edit-basic-info-select-arrow ${isSsnTypeOpen ? 'is-open' : ''}`} />
                </div>
                
                {isSsnTypeOpen && (
                  <div className="edit-basic-info-dropdown-list">
                    {['Select', 'National Identity Number', 'Passport', "Driver's License"].map(option => (
                      <div 
                        key={option}
                        className={`edit-basic-info-dropdown-item ${formData.ssnType === option ? 'is-selected' : ''}`}
                        onClick={() => handleSelectChange('ssnType', option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
