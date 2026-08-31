import { useState, useRef, useEffect } from 'react';
import '../../modals/ModalBase/ModalBase.css';
import addExpense from '../../../assets/Fowgate Folder/Add Expense Claim.svg';
import arrowDown from '../../../assets/Fowgate Folder/arrow-down-01.svg';
import calendarIcon from '../../../assets/Fowgate Folder/calendar-03.svg';
import aiIcon from '../../../assets/Fowgate Folder/AI.svg';

function CustomCalendarPopover({ selectedDate, onSelectDate, onClose }) {
  const initialDate = selectedDate ? new Date(selectedDate) : new Date();
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const prevMonthDays = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    prevMonthDays.push(daysInPrevMonth - i);
  }

  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(i);
  }

  const totalSoFar = prevMonthDays.length + currentMonthDays.length;
  const targetTotal = totalSoFar > 35 ? 42 : 35;
  const nextMonthDays = [];
  for (let i = 1; i <= targetTotal - totalSoFar; i++) {
    nextMonthDays.push(i);
  }

  const parseSelected = selectedDate ? selectedDate.split('-') : [];
  const selYear = parseSelected.length === 3 ? parseInt(parseSelected[0], 10) : null;
  const selMonth = parseSelected.length === 3 ? parseInt(parseSelected[1], 10) - 1 : null;
  const selDay = parseSelected.length === 3 ? parseInt(parseSelected[2], 10) : null;

  const handleSelectDay = (day) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    onSelectDate(`${currentYear}-${formattedMonth}-${formattedDay}`);
    onClose();
  };

  const handleToday = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    onSelectDate(`${y}-${m}-${d}`);
    onClose();
  };

  const handleClear = () => {
    onSelectDate('');
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: 'calc(100% + 6px)',
        left: 0,
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 14px 36px rgba(0, 0, 0, 0.14)',
        padding: '16px',
        zIndex: 1000,
        width: '270px',
        fontFamily: 'Rubik, sans-serif'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
          {monthNames[currentMonth]} {currentYear}
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            type="button"
            onClick={handlePrevMonth}
            style={{
              background: 'none',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            style={{
              background: 'none',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            ›
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px' }}>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
          <span key={d} style={{ fontSize: '11.5px', fontWeight: '600', color: '#94a3b8' }}>
            {d}
          </span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
        {prevMonthDays.map((d, idx) => (
          <div key={`prev-${idx}`} style={{ padding: '6px 0', fontSize: '12.5px', color: '#cbd5e1' }}>
            {d}
          </div>
        ))}
        {currentMonthDays.map((d) => {
          const isSelected = selYear === currentYear && selMonth === currentMonth && selDay === d;
          return (
            <div
              key={`curr-${d}`}
              onClick={() => handleSelectDay(d)}
              style={{
                padding: '6px 0',
                fontSize: '12.5px',
                fontWeight: isSelected ? '700' : '400',
                color: isSelected ? '#ffffff' : '#1e293b',
                backgroundColor: isSelected ? '#1f66c7' : 'transparent',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.12s ease'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {d}
            </div>
          );
        })}
        {nextMonthDays.map((d, idx) => (
          <div key={`next-${idx}`} style={{ padding: '6px 0', fontSize: '12.5px', color: '#cbd5e1' }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
        <button
          type="button"
          onClick={handleClear}
          style={{ background: 'none', border: 'none', color: '#1f66c7', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleToday}
          style={{ background: 'none', border: 'none', color: '#1f66c7', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer' }}
        >
          Today
        </button>
      </div>
    </div>
  );
}

function DatePickerInput({ label, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const getDisplayDate = (val) => {
    if (!val) return 'Select date';
    const parts = val.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parts[2];
      const monthAbbrs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (monthIdx >= 0 && monthIdx < 12) {
        return `${day} ${monthAbbrs[monthIdx]}, ${year}`;
      }
    }
    return val;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="form-group" style={{ position: 'relative' }} ref={containerRef}>
      <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
        {label}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          height: '42px',
          borderRadius: '4px',
          border: `1px solid ${isOpen ? '#1f66c7' : '#cbd5e1'}`,
          boxShadow: isOpen ? '0 0 0 3px rgba(31, 102, 199, 0.1)' : 'none',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
      >
        <span style={{ fontSize: '14px', color: value ? '#1e293b' : '#94a3b8', fontFamily: 'Rubik, sans-serif' }}>
          {getDisplayDate(value)}
        </span>
        <img
          src={calendarIcon}
          alt="calendar"
          style={{ width: '18px', height: '18px', pointerEvents: 'none' }}
        />
      </div>

      {isOpen && (
        <CustomCalendarPopover
          selectedDate={value}
          onSelectDate={(newDate) => {
            onChange(newDate);
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default function AddPolicyModal({ isOpen, onClose, onAddPolicy, onSubmit, categoryName }) {
  const [policyName, setPolicyName] = useState('Termination Management');
  const [category, setCategory] = useState(categoryName || 'Contractual');
  const [dateCreated, setDateCreated] = useState('2024-12-12');
  const [renewalDate, setRenewalDate] = useState('2025-03-12');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Policy sections start EMPTY until user clicks "+ Create Policy"
  const [policySections, setPolicySections] = useState([]);

  if (!isOpen) return null;

  const handleAddSection = () => {
    setPolicySections((prev) => [
      ...prev,
      { id: Date.now(), title: '', content: '' }
    ]);
  };

  const handleUpdateSectionTitle = (id, newTitle) => {
    setPolicySections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title: newTitle } : s))
    );
  };

  const handleUpdateSectionContent = (id, newContent) => {
    setPolicySections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, content: newContent } : s))
    );
  };

  const handleRemoveSection = (id) => {
    setPolicySections((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      policyName,
      title: policyName,
      category,
      dateCreated,
      renewalDate,
      sections: policySections
    };
    if (onSubmit) {
      onSubmit(policyName || 'New Policy', data);
    } else if (onAddPolicy) {
      onAddPolicy(data);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="claim-modal add-policy-modal" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
        {/* Header */}
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={addExpense} alt="" className="claim-modal-title-icon" />
            Add Policy
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close" aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* Scrollable Modal Body */}
          <div
            className="notif-list"
            style={{
              padding: '24px 24px 32px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              flex: '1 1 auto',
              minHeight: 0,
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 180px)',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Policy Title */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                Policy Title
              </label>
              <input
                type="text"
                className="form-input"
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
                placeholder="Enter policy title"
                required
                style={{
                  height: '42px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  padding: '0 14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Compliance Category */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                Compliance Category
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  style={{
                    height: '42px',
                    borderRadius: '4px',
                    border: `1px solid ${isCategoryOpen ? '#1f66c7' : '#cbd5e1'}`,
                    boxShadow: isCategoryOpen ? '0 0 0 3px rgba(31, 102, 199, 0.1)' : 'none',
                    fontSize: '14px',
                    color: category ? '#1e293b' : '#94a3b8',
                    padding: '0 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{category || 'Select Category'}</span>
                  <img
                    src={arrowDown}
                    alt=""
                    style={{
                      width: '14px',
                      height: '14px',
                      transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </div>

                {isCategoryOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      width: '100%',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      zIndex: 100,
                      overflow: 'hidden',
                      padding: '4px 0'
                    }}
                  >
                    {['Operational', 'Contractual', 'Data', 'Financial', 'Security', 'HSE', 'Tax Laws'].map((catItem) => {
                      const isSelected = category === catItem;
                      return (
                        <div
                          key={catItem}
                          onClick={() => {
                            setCategory(catItem);
                            setIsCategoryOpen(false);
                          }}
                          style={{
                            padding: '10px 14px',
                            fontSize: '13.5px',
                            color: isSelected ? '#1f66c7' : '#334155',
                            backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                            fontWeight: isSelected ? '600' : '400',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'background-color 0.12s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = '#f8fafc';
                              e.currentTarget.style.color = '#1f66c7';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = '#ffffff';
                              e.currentTarget.style.color = '#334155';
                            }
                          }}
                        >
                          <span>{catItem}</span>
                          {isSelected && <span style={{ fontSize: '13px', fontWeight: 'bold' }}>✓</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Date Created & Renewal Date Row */}
            <div className="policy-date-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <DatePickerInput
                label="Date Created"
                value={dateCreated}
                onChange={setDateCreated}
              />
              <DatePickerInput
                label="Renewal Date"
                value={renewalDate}
                onChange={setRenewalDate}
              />
            </div>

            {/* + Create Policy Link Button */}
            <div style={{ textAlign: 'right', marginTop: '-6px' }}>
              <button
                type="button"
                onClick={handleAddSection}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1f66c7',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                + Create Policy
              </button>
            </div>

            {/* Dynamic Policy Section Cards (Only shown when + Create Policy is clicked) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {policySections.map((sec) => (
                <div
                  key={sec.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {/* Light blue header bar matching Figma */}
                  <div
                    style={{
                      backgroundColor: '#edf4ff',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #dbeafe'
                    }}
                  >
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => handleUpdateSectionTitle(sec.id, e.target.value)}
                      placeholder="Enter Title"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '13.5px',
                        fontWeight: '600',
                        color: '#1e293b',
                        width: '100%',
                        fontFamily: 'Rubik, sans-serif'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(sec.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '0 4px'
                      }}
                      aria-label="Remove section"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Clean text area without inner scrollbar controls */}
                  <div style={{ padding: '14px 16px' }}>
                    <textarea
                      value={sec.content}
                      onChange={(e) => {
                        handleUpdateSectionContent(sec.id, e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                      placeholder="Type here"
                      style={{
                        width: '100%',
                        minHeight: '110px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '13px',
                        color: '#475569',
                        lineHeight: '1.6',
                        fontFamily: 'Rubik, sans-serif',
                        resize: 'none',
                        overflow: 'hidden',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating AI Sparkles Button positioned cleanly above the footer */}
          <button
            type="button"
            style={{
              position: 'absolute',
              right: '24px',
              bottom: '96px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#1f66c7',
              border: 'none',
              boxShadow: '0 4px 14px rgba(31, 102, 199, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label="AI Assist"
          >
            <img src={aiIcon} alt="" style={{ width: '24px', height: '24px' }} />
          </button>

          {/* Modal Actions Footer */}
          <div className="claim-modal-actions">
            <button type="button" className="modal-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '9px 24px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#edf4ff',
                color: '#1d4ed8',
                fontSize: '13.5px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#dbeafe')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#edf4ff')}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
