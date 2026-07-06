import { useState } from 'react';
import '../ModalBase/ModalBase.css';
import './OngoingTrainingModal.css';

import addExpense from '../../../assets/Fowgate Folder/Add Expense Claim.svg';
import calendarIcon from '../../../assets/Fowgate Folder/calendar-03.svg';
import fileUploadIcon from '../../../assets/Fowgate Folder/image-upload.svg';
import pdfIcon from '../../../assets/Fowgate Folder/pdf-file-svgrepo-com 1.svg';
import jpgIcon from '../../../assets/Fowgate Folder/jpg-svgrepo-com 1.svg';
import docIcon from '../../../assets/Fowgate Folder/ms-word-svgrepo-com 1.svg';

export default function OngoingTrainingModal({ onClose, onSubmit, trainingData }) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Initialize file state
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + 'MB',
        progress: 0, 
        type: file.type
      });

      // Track read progress to simulate upload progress
      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadedFile(prev => prev ? { ...prev, progress: Math.min(progress, 99) } : null);
        }
      };

      reader.onloadend = () => {
        setUploadedFile(prev => prev ? { ...prev, progress: 100 } : null);
      };

      reader.onerror = () => {
        setUploadedFile(prev => prev ? { ...prev, progress: 0 } : null);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const getFileIcon = (type) => {
    if (!type) return jpgIcon;
    if (type.includes('pdf')) return pdfIcon;
    if (type.includes('word') || type.includes('document')) return docIcon;
    return jpgIcon;
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <div className="modal-overlay">
      <div className="claim-modal ongoing-training-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={addExpense} alt="Training Icon" className="claim-modal-title-icon" />
            Ongoing Training
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="ongoing-training-form">
          <div className="hide-scrollbar ongoing-training-scroll">
            
            <div className="ongoing-training-field">
              <label>Certification Title</label>
              <input 
                type="text" 
                value={trainingData?.title || 'Wireframing and Prototyping'}
                className="ongoing-training-input" 
                readOnly
              />
            </div>

            <div className="ongoing-training-field">
              <label>Certification Provider</label>
              <input 
                type="text" 
                value={trainingData?.provider || 'Coursera'}
                className="ongoing-training-input" 
                readOnly
              />
            </div>

            <div className="ongoing-training-field">
              <label>Start Date</label>
              <div className="ongoing-training-date-wrap">
                <input 
                  type="text" 
                  value={trainingData?.startDate || '06-07-2026'}
                  className="ongoing-training-input" 
                  readOnly
                />
                <img src={calendarIcon} alt="calendar" className="date-icon" />
              </div>
            </div>

            <div className="ongoing-training-field">
              <label>End Date</label>
              <div className="ongoing-training-date-wrap">
                <input 
                  type="text" 
                  value={trainingData?.endDate || '31-09-2026'}
                  className="ongoing-training-input" 
                  readOnly
                />
                <img src={calendarIcon} alt="calendar" className="date-icon" />
              </div>
            </div>

            <div className="ongoing-training-field">
              <label>Upload Certificate</label>
              
              <div className="upload-certificate-box">
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
                  className="upload-certificate-input"
                  onChange={handleFileChange}
                />
                <img src={fileUploadIcon} alt="Upload" className="upload-certificate-icon" />
                <div className="upload-certificate-text">
                  Drag and drop file or <span>Browse</span>
                </div>
                <p className="upload-certificate-subtext">File must be JPG, PNG, PDF or DOC and max of 5MB</p>
              </div>

              {uploadedFile && (
                <div className="uploaded-file-preview" style={{ marginTop: '12px' }}>
                  <img src={getFileIcon(uploadedFile.type)} alt="File" className="uploaded-file-icon" />
                  <div className="uploaded-file-info">
                    <div className="uploaded-file-name">{uploadedFile.name}</div>
                    <div className="uploaded-file-meta">
                      {uploadedFile.size} &bull; 1 page
                    </div>
                  </div>
                  <div className="uploaded-file-progress-container">
                    <div className="uploaded-file-progress-bar">
                      <div className="uploaded-file-progress-fill" style={{ width: `${uploadedFile.progress}%` }}></div>
                    </div>
                    <span className="uploaded-file-percentage">{uploadedFile.progress}%</span>
                  </div>
                  <button type="button" className="uploaded-file-remove" onClick={removeFile}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              )}
            </div>

          </div>

          <div className="claim-modal-actions">
            <button type="button" onClick={onClose} className="modal-btn-cancel" style={{ border: 'none', background: 'transparent' }}>End Training</button>
            <button type="submit" className="modal-btn-submit" disabled={!uploadedFile}>Complete Training</button>
          </div>
        </form>
      </div>
    </div>
  );
}
