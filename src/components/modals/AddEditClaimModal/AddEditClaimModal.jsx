import '../ModalBase/ModalBase.css';
import './AddEditClaimModal.css';
import calendarIcon from '../../../assets/Fowgate Folder/calendar-03.svg';
import fileUpload from '../../../assets/Fowgate Folder/file-upload.svg';
import AttachmentIcon from '../AttachmentIcon/AttachmentIcon';
import { getAttachmentMeta } from '../attachmentUtils';

const todayKey = (() => {
  const t = new Date();
  return `${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`;
})();

export default function AddEditClaimModal({
  modalMode,
  modalStep,
  newClaim,
  setNewClaim,
  formErrors,
  setFormErrors,
  categories,
  setCategories,
  uploadedFiles,
  setUploadedFiles,
  onClose,
  onSubmit,
  formatCurrency,
  dateButtonRef,
  dateIconRef,
  calendarRef,
  isDateDropdownOpen,
  setIsDateDropdownOpen,
  calendarDate,
  monthNames,
  calendarDays,
  handlePrevMonth,
  handleNextMonth,
  handleSelectDate,
  isSelectedDate
}) {
  const totalAmount = categories.reduce((sum, cat) => sum + parseFloat(cat.amount || 0), 0);

  const updateCategory = (index, field, value) => {
    const nextCategories = [...categories];
    nextCategories[index][field] = value;
    setCategories(nextCategories);
  };

  const getUploadId = (file, index) => (
    `${file.webkitRelativePath || file.name}-${file.lastModified}-${file.size}-${index}`
  );

  const updateUploadProgress = (uploadId, progress, loadedBytes, status = 'uploading') => {
    setUploadedFiles((currentFiles) => currentFiles.map((file) => (
      file.uploadId === uploadId
        ? {
            ...file,
            progress: Math.min(100, Math.max(0, progress)),
            loadedBytes,
            status
          }
        : file
    )));
  };

  const trackFileRead = (file, uploadId, getProgressState) => {
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const { progress, loadedBytes } = getProgressState(event.loaded);
      updateUploadProgress(uploadId, progress, loadedBytes);
    };

    reader.onloadend = () => {
      const { progress, loadedBytes } = getProgressState(file.size);
      updateUploadProgress(uploadId, progress || 100, loadedBytes, 'complete');
    };

    reader.onerror = () => {
      updateUploadProgress(uploadId, 0, 0, 'failed');
    };

    reader.readAsArrayBuffer(file);
  };

  const handlePickedFiles = (fileList) => {
    const selectedFiles = Array.from(fileList || []);
    if (selectedFiles.length === 0) return;

    const uploadEntries = selectedFiles.map((file, index) => ({
      ...getAttachmentMeta(file),
      uploadId: getUploadId(file, index),
      progress: 0,
      loadedBytes: 0,
      totalBytes: file.size,
      status: 'uploading'
    }));

    setUploadedFiles((currentFiles) => [...currentFiles, ...uploadEntries]);

    selectedFiles.forEach((file, index) => {
      const uploadId = uploadEntries[index].uploadId;

      trackFileRead(file, uploadId, (loaded) => {
        return {
          progress: file.size > 0 ? (loaded / file.size) * 100 : 100,
          loadedBytes: loaded
        };
      });
    });
  };

  return (
    <div className="modal-overlay">
      <div className="claim-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title add-edit-title">
            <svg viewBox="0 0 24 24" className="claim-modal-title-icon" aria-hidden="true">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z" />
            </svg>
            {modalMode === 'edit' ? 'Edit Expense Claim' : 'Add Expense Claim'}
          </h3>
          <button onClick={onClose} className="claim-modal-close">x</button>
        </div>

        <form onSubmit={onSubmit} className="add-edit-form">
          <div className="hide-scrollbar add-edit-scroll">
            <div className="add-edit-step">
              <span className={`add-edit-step-spinner ${modalStep === 2 ? 'is-step-two' : ''}`} />
              <span>{modalStep}/2 - <strong>{modalStep === 1 ? 'EXPENSE DETAILS' : 'EXPENSE AMOUNT'}</strong></span>
            </div>

            {modalStep === 1 ? (
              <>
                <div className="add-edit-field add-edit-description-field">
                  <label>Description</label>
                  <div className="add-edit-textarea-wrap">
                    <textarea
                      placeholder="Type here"
                      maxLength="150"
                      value={newClaim.purpose}
                      onChange={(event) => {
                        setNewClaim({ ...newClaim, purpose: event.target.value });
                        setFormErrors((errors) => ({ ...errors, purpose: '' }));
                      }}
                      className={formErrors.purpose ? 'is-invalid' : ''}
                      required
                    />
                    <span>{newClaim.purpose.length}/150</span>
                  </div>
                </div>

                <div className="add-edit-field">
                  <label>Extra Note</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={newClaim.extraNote}
                    onChange={(event) => setNewClaim({ ...newClaim, extraNote: event.target.value })}
                  />
                </div>

                <div className="add-edit-field add-edit-date-field">
                  <label>Expense Date</label>
                  <div className="add-edit-date-wrap">
                    <div
                      ref={dateButtonRef}
                      className={`add-edit-date-input ${formErrors.date ? 'is-invalid' : ''}`}
                      onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    >
                      <span className={newClaim.date ? '' : 'is-placeholder'}>{newClaim.date || 'Select date'}</span>
                    </div>
                    <img
                      ref={dateIconRef}
                      src={calendarIcon}
                      className="add-edit-date-icon"
                      alt="Calendar"
                      onClick={(event) => {
                        event.stopPropagation();
                        setIsDateDropdownOpen((isOpen) => !isOpen);
                      }}
                    />

                    {isDateDropdownOpen && (
                      <div ref={calendarRef} className="add-edit-calendar" onClick={(event) => event.stopPropagation()}>
                        <div className="add-edit-calendar-header">
                          <button type="button" onClick={handlePrevMonth}>&lt;</button>
                          <span>{monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}</span>
                          <button type="button" onClick={handleNextMonth}>&gt;</button>
                        </div>
                        <div className="add-edit-calendar-weekdays">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((weekday, index) => (
                            <div key={`${weekday}-${index}`}>{weekday}</div>
                          ))}
                        </div>
                        <div className="add-edit-calendar-days">
                          {calendarDays.map((day, index) => (
                            day === null ? (
                              <div key={`empty-${index}`} className="add-edit-calendar-empty" />
                            ) : (() => {
                              const isToday =
                                `${calendarDate.getFullYear()}-${calendarDate.getMonth()}-${day}` === todayKey;
                              const isSelected = isSelectedDate(day);
                              return (
                                <button
                                  key={`day-${day}`}
                                  type="button"
                                  onClick={() => handleSelectDate(day)}
                                  className={[
                                    isSelected ? 'is-selected' : '',
                                    isToday ? 'is-today' : ''
                                  ].filter(Boolean).join(' ')}
                                >
                                  {day}
                                </button>
                              );
                            })()
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {categories.map((cat, index) => (
                  <div key={cat.id} className="add-edit-category-panel">
                    <button
                      type="button"
                      className="add-edit-category-header"
                      onClick={() => updateCategory(index, 'isExpanded', !cat.isExpanded)}
                    >
                      <strong>Category {index + 1}</strong>
                      <span className={cat.isExpanded ? '' : 'is-collapsed'}>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 6.5L6 1.5L11 6.5" stroke="#292929" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>

                    {cat.isExpanded && (
                      <div className="add-edit-category-body">
                        <div className="add-edit-field">
                          <label>Expense Category {index + 1}</label>
                          <select
                            value={cat.type}
                            onChange={(event) => {
                              updateCategory(index, 'type', event.target.value);
                              setFormErrors((errors) => ({ ...errors, [`categoryType-${index}`]: '', categories: '' }));
                            }}
                            className={formErrors[`categoryType-${index}`] ? 'is-invalid' : ''}
                          >
                            <option value="">Select</option>
                            <option>Transportation</option>
                            <option>Food</option>
                            <option>Accommodation</option>
                            <option>Communication</option>
                            <option>Medical</option>
                            <option>Equipment Purchases</option>
                          </select>
                        </div>

                        <div className="add-edit-field">
                          <label>Amount</label>
                          <div className="add-edit-amount-wrap">
                            <span>&#8358;</span>
                            <input
                              type="number"
                              placeholder="Enter amount"
                              value={cat.amount}
                              onChange={(event) => {
                                updateCategory(index, 'amount', event.target.value);
                                setFormErrors((errors) => ({ ...errors, [`categoryAmount-${index}`]: '', categories: '' }));
                              }}
                              className={formErrors[`categoryAmount-${index}`] ? 'is-invalid' : ''}
                              min="0"
                            />
                          </div>
                        </div>

                        <div className="add-edit-field">
                          <label>Details</label>
                          <textarea
                            placeholder="Type here"
                            value={cat.details}
                            onChange={(event) => {
                              updateCategory(index, 'details', event.target.value);
                              setFormErrors((errors) => ({ ...errors, [`categoryDetails-${index}`]: '', categories: '' }));
                            }}
                            className={`add-edit-details ${formErrors[`categoryDetails-${index}`] ? 'is-invalid' : ''}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="add-edit-add-category"
                  onClick={() => setCategories([...categories, { id: Date.now(), type: '', amount: '', details: '', isExpanded: true }])}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11M1 6H11" stroke="#1f66c7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Add Categories
                </button>

                <div className="add-edit-upload-section">
                  <div className="add-edit-upload-label">Attach file</div>
                  <div className="add-edit-upload-box">
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(event) => {
                        handlePickedFiles(event.target.files);
                        event.target.value = '';
                      }}
                    />
                    <img src={fileUpload} alt="Upload File" />
                    <div>Drag and drop file or <span>Browse</span></div>
                    <p>File must be JPG, PNG, PDF or DOC and max of 5MB</p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="add-edit-upload-list">
                      {uploadedFiles.map((file, index) => (
                        <div key={`${file.uploadId || file.name}-${file.lastModified}-${index}`} className="add-edit-upload-item">
                          <AttachmentIcon file={file} />
                          <div className="add-edit-upload-text">
                            <div>
                              <strong>{file.name}</strong>
                              <span>{(file.size / 1024).toFixed(0)}KB</span>
                            </div>
                            <div
                              className="add-edit-upload-progress"
                              role="progressbar"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              aria-valuenow={Math.round(file.progress ?? 100)}
                              aria-label={`${file.name} upload progress`}
                            >
                              <span style={{ width: `${file.progress ?? 100}%` }} />
                            </div>
                            <small className={`add-edit-upload-status ${file.status === 'failed' ? 'is-failed' : ''}`}>
                              {file.status === 'failed'
                                ? 'Failed'
                                : `${Math.round(file.progress ?? 100)}% complete`}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </>
            )}
          </div>

          {modalStep === 2 && (
            <div className="add-edit-total">
              <span>Total Amount</span>
              <strong>{formatCurrency(totalAmount)}</strong>
            </div>
          )}

          <div className="claim-modal-actions">
            <button type="button" onClick={onClose} className="modal-btn-cancel">Close</button>
            <button type="submit" className="modal-btn-submit">{modalStep === 1 ? 'Next' : 'Submit'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
