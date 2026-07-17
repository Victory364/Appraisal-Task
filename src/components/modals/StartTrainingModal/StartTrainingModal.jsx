import { useState, useRef, useEffect } from 'react';
import '../ModalBase/ModalBase.css';
import './StartTrainingModal.css';
import arrowDownIcon from '../../../assets/Fowgate Folder/arrow-down-01.svg';
import calendarIcon from '../../../assets/Fowgate Folder/calendar-03.svg';
import addExpense from '../../../assets/Fowgate Folder/Add Expense Claim.svg';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const parseDateStr = (dateStr) => {
  if (!dateStr) return new Date();
  const parts = dateStr.includes('/') ? dateStr.split('/') : dateStr.split('-');
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

export default function StartTrainingModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    provider: 'Select',
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState({
    startDate: '',
    endDate: ''
  });

  const [isProviderOpen, setIsProviderOpen] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState(null); // 'start' | 'end' | null
  const [calendarDate, setCalendarDate] = useState(() => new Date());

  const providerRef = useRef(null);
  const startWrapRef = useRef(null);
  const endWrapRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (providerRef.current && !providerRef.current.contains(e.target)) {
        setIsProviderOpen(false);
      }
      if (startWrapRef.current && !startWrapRef.current.contains(e.target) && activeCalendar === 'startDate') {
        setActiveCalendar(null);
      }
      if (endWrapRef.current && !endWrapRef.current.contains(e.target) && activeCalendar === 'endDate') {
        setActiveCalendar(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeCalendar]);

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsProviderOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e, field) => {
    let value = e.target.value;
    const prevValue = formData[field] || '';
    if (value.length < prevValue.length) {
      if (prevValue.endsWith('/') && !value.endsWith('/')) {
        value = value.slice(0, -1);
      }
    }
    const clean = value.replace(/\D/g, '').slice(0, 8);
    let formatted = clean;
    if (clean.length > 2) {
      formatted = `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
    }
    if (clean.length > 4) {
      formatted = `${clean.slice(0, 2)}/${clean.slice(2, 4)}/${clean.slice(4, 8)}`;
    }
    setFormData(prev => ({ ...prev, [field]: formatted }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = { startDate: '', endDate: '' };
    let hasError = false;
    
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    
    const isValidDate = (d, m, y) => {
      const date = new Date(y, m - 1, d);
      return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
    };
    
    // Validate Start Date
    const startMatch = formData.startDate.match(dateRegex);
    if (!startMatch) {
      newErrors.startDate = 'Must be in DD/MM/YYYY format';
      hasError = true;
    } else {
      const d = parseInt(startMatch[1], 10);
      const m = parseInt(startMatch[2], 10);
      const y = parseInt(startMatch[3], 10);
      if (!isValidDate(d, m, y)) {
        newErrors.startDate = 'Please enter a valid date';
        hasError = true;
      }
    }
    
    // Validate End Date
    const endMatch = formData.endDate.match(dateRegex);
    if (!endMatch) {
      newErrors.endDate = 'Must be in DD/MM/YYYY format';
      hasError = true;
    } else {
      const d = parseInt(endMatch[1], 10);
      const m = parseInt(endMatch[2], 10);
      const y = parseInt(endMatch[3], 10);
      if (!isValidDate(d, m, y)) {
        newErrors.endDate = 'Please enter a valid date';
        hasError = true;
      }
    }
    
    // Compare dates if no format/validity issues
    if (!hasError) {
      const startMatchVal = formData.startDate.match(dateRegex);
      const endMatchVal = formData.endDate.match(dateRegex);
      
      const sD = parseInt(startMatchVal[1], 10);
      const sM = parseInt(startMatchVal[2], 10);
      const sY = parseInt(startMatchVal[3], 10);
      
      const eD = parseInt(endMatchVal[1], 10);
      const eM = parseInt(endMatchVal[2], 10);
      const eY = parseInt(endMatchVal[3], 10);
      
      const startDateObj = new Date(sY, sM - 1, sD);
      const endDateObj = new Date(eY, eM - 1, eD);
      
      if (startDateObj > endDateObj) {
        newErrors.startDate = 'Start date cannot be after end date';
        newErrors.endDate = 'End date cannot be before start date';
        hasError = true;
      }
    }
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    
    if (onSubmit) onSubmit(formData);
  };

  // Calendar Helpers
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
    const firstDay = new Date(year, month, 1).getDay(); // Sunday is 0
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

  const handleSelectDay = (day, field) => {
    if (!day) return;
    const year = calendarDate.getFullYear();
    const month = (calendarDate.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const formattedDate = `${dayStr}/${month}/${year}`;
    
    setFormData(prev => ({ ...prev, [field]: formattedDate }));
    setActiveCalendar(null);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const isSelectedDate = (day, field) => {
    if (!day) return false;
    const currentSelected = parseDateStr(formData[field]);
    if (!formData[field]) return false; // Don't highlight today automatically if nothing selected
    return currentSelected.getFullYear() === calendarDate.getFullYear() &&
           currentSelected.getMonth() === calendarDate.getMonth() &&
           currentSelected.getDate() === day;
  };

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear + 5; y >= 1900; y--) {
    years.push(y);
  }

  const openCalendar = (type) => {
    if (activeCalendar === type) {
      setActiveCalendar(null);
    } else {
      setActiveCalendar(type);
      const currentDate = formData[type] ? parseDateStr(formData[type]) : new Date();
      setCalendarDate(currentDate);
    }
  };

  const renderCalendar = (field) => (
    <div className="dob-calendar-dropdown" onClick={(e) => e.stopPropagation()}>
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
              onClick={() => handleSelectDay(day, field)}
              className={`dob-calendar-day-btn ${isSelectedDate(day, field) ? 'is-selected' : ''}`}
            >
              {day}
            </button>
          )
        ))}
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="claim-modal start-training-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={addExpense} alt="Training Icon" className="claim-modal-title-icon" />
            Start a Training
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="start-training-form">
          <div className="hide-scrollbar start-training-scroll">
            
            <div className="start-training-field">
              <label>Certification Title</label>
              <input 
                type="text" 
                name="title"
                placeholder="Enter Title"
                value={formData.title}
                onChange={handleChange}
                className="start-training-input" 
                required
              />
            </div>

            <div className="start-training-field">
              <label>Certification Provider</label>
              <div className="start-training-select-wrap" ref={providerRef}>
                <div 
                  className="start-training-select-trigger"
                  onClick={() => setIsProviderOpen(!isProviderOpen)}
                >
                  <span className={formData.provider === 'Select' ? 'text-placeholder' : ''}>
                    {formData.provider}
                  </span>
                  <img src={arrowDownIcon} alt="dropdown arrow" className={`start-training-select-arrow ${isProviderOpen ? 'is-open' : ''}`} />
                </div>
                
                {isProviderOpen && (
                  <div className="start-training-dropdown-list">
                    {['Coursera', 'Udemy', 'Pluralsight', 'LinkedIn Learning', 'Other'].map(option => (
                      <div 
                        key={option}
                        className={`start-training-dropdown-item ${formData.provider === option ? 'is-selected' : ''}`}
                        onClick={() => handleSelectChange('provider', option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="start-training-field">
              <label>Start Date</label>
              <div className="start-training-date-wrap" ref={startWrapRef}>
                <input 
                  type="text" 
                  name="startDate"
                  value={formData.startDate}
                  placeholder="dd/mm/yyyy"
                  onChange={(e) => handleDateChange(e, 'startDate')}
                  onClick={() => openCalendar('startDate')}
                  className={`start-training-input start-training-date-input ${errors.startDate ? 'input-error' : ''}`} 
                  required
                />
                <img 
                  src={calendarIcon} 
                  alt="calendar" 
                  className="date-icon" 
                  onClick={() => openCalendar('startDate')} 
                />
                {activeCalendar === 'startDate' && renderCalendar('startDate')}
              </div>
              {errors.startDate && <span className="field-error-msg">{errors.startDate}</span>}
            </div>

            <div className="start-training-field">
              <label>End Date</label>
              <div className="start-training-date-wrap" ref={endWrapRef}>
                <input 
                  type="text" 
                  name="endDate"
                  value={formData.endDate}
                  placeholder="dd/mm/yyyy"
                  onChange={(e) => handleDateChange(e, 'endDate')}
                  onClick={() => openCalendar('endDate')}
                  className={`start-training-input start-training-date-input ${errors.endDate ? 'input-error' : ''}`} 
                  required
                />
                <img 
                  src={calendarIcon} 
                  alt="calendar" 
                  className="date-icon" 
                  onClick={() => openCalendar('endDate')} 
                />
                {activeCalendar === 'endDate' && renderCalendar('endDate')}
              </div>
              {errors.endDate && <span className="field-error-msg">{errors.endDate}</span>}
            </div>

          </div>

          <div className="claim-modal-actions">
            <button type="button" onClick={onClose} className="modal-btn-cancel" style={{ border: 'none', background: 'transparent' }}>Cancel</button>
            <button type="submit" className="modal-btn-submit">Start Training</button>
          </div>
        </form>
      </div>
    </div>
  );
}
