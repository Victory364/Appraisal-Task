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
  const parts = dateStr.split('-');
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
      if (startWrapRef.current && !startWrapRef.current.contains(e.target) && activeCalendar === 'start') {
        setActiveCalendar(null);
      }
      if (endWrapRef.current && !endWrapRef.current.contains(e.target) && activeCalendar === 'end') {
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    const formattedDate = `${dayStr}-${month}-${year}`;
    
    setFormData(prev => ({ ...prev, [field]: formattedDate }));
    setActiveCalendar(null);
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
                  onClick={() => openCalendar('startDate')}
                  readOnly
                  className="start-training-input start-training-date-input" 
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
            </div>

            <div className="start-training-field">
              <label>End Date</label>
              <div className="start-training-date-wrap" ref={endWrapRef}>
                <input 
                  type="text" 
                  name="endDate"
                  value={formData.endDate}
                  placeholder="dd/mm/yyyy"
                  onClick={() => openCalendar('endDate')}
                  readOnly
                  className="start-training-input start-training-date-input" 
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
