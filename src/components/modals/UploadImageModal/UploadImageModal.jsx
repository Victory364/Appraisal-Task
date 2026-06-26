import { useState } from 'react';
import '../ModalBase/ModalBase.css';
import './UploadImageModal.css';
import fileIcon from '../../../assets/Fowgate Folder/file-02.svg';
import fileUploadIcon from '../../../assets/Fowgate Folder/image-upload.svg';

export default function UploadImageModal({ onClose, onUpload }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="claim-modal upload-image-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={fileIcon} alt="File" className="claim-modal-title-icon" />
            Upload Image
          </h3>
          <button onClick={onClose} className="claim-modal-close">✕</button>
        </div>

        <div className="upload-image-body">
          <label className="upload-image-label">Upload Image</label>
          <div className="upload-image-box">
            <input 
              type="file" 
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
              className="upload-image-input"
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="upload-image-preview" />
            ) : (
              <>
                <img src={fileUploadIcon} alt="Upload" className="upload-image-icon" />
                <div className="upload-image-text">
                  <span><a>Click to Upload</a></span> or drag and drop
                </div>
                <p className="upload-image-subtext">File must be JPG, PDF or DOC and max of 5MB</p>
              </>
            )}
          </div>
        </div>

        <div className="claim-modal-actions">
          <button type="button" onClick={onClose} className="modal-btn-cancel">Cancel</button>
          <button type="button" onClick={() => onUpload && onUpload(imagePreview)} className="modal-btn-submit">Upload</button>
        </div>
      </div>
    </div>
  );
}
