import './ModalBase.css';
import './ViewDetailModal.css';
import viewDetailIcon from '../../assets/Fowgate Folder/file-02.svg';
import AttachmentIcon from './AttachmentIcon';
import { formatAttachmentDate, formatFileSize } from './attachmentUtils';

export default function ViewDetailModal({ claim, formatCurrency, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="claim-modal view-detail-modal">
        <div className="claim-modal-header view-detail-header">
          <h3 className="claim-modal-title view-detail-title">
            <img src={viewDetailIcon} alt="View Detail" />
            View Expense Claim
          </h3>
          <button onClick={onClose} className="claim-modal-close view-detail-close">x</button>
        </div>

        <div className="hide-scrollbar view-detail-body">
          <div className="view-detail-person-row">
            <div className="view-detail-person">
              <div className="view-detail-avatar">
                <img src="https://i.pravatar.cc/100" alt="avatar" />
              </div>
              <div>
                <div className="view-detail-name">{claim.user?.name || 'David Adeniyi'}</div>
                <div className="view-detail-role">{claim.user?.role || 'Sales Manager'}</div>
              </div>
            </div>
            <div className="view-detail-status">{claim.status}</div>
          </div>

          <div className="view-detail-dates">
            <div>
              <div>Date Created</div>
              <strong>{claim.date}</strong>
            </div>
            <div>
              <div>Date Submitted</div>
              <strong>{claim.dateSubmitted || claim.date}</strong>
            </div>
            <div>
              <div>Date Approved</div>
              <strong>{claim.dateApproved || '-'}</strong>
            </div>
          </div>

          <div className="view-detail-section-title">Description</div>
          <div className="view-detail-description">{claim.purpose}</div>

          <table className="view-detail-table">
            <thead>
              <tr>
                <th>Expense Category</th>
                <th>Details</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {claim.categories?.map((cat, index) => (
                <tr key={`${cat.type}-${index}`}>
                  <td>{cat.type}</td>
                  <td title={cat.details}>{cat.details}</td>
                  <td>{formatCurrency(cat.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="view-detail-total">
            <span>Total Amount</span>
            <span>{formatCurrency(claim.amount)}</span>
          </div>

          <div className="view-detail-attachments-title">
            Attachments ({claim.attachments?.length || 0})
          </div>
          {(claim.attachments || []).map((file, index) => (
            <div key={`${file.name}-${file.lastModified}-${index}`} className="view-detail-attachment">
              <div className="view-detail-attachment-icon">
                <div>
                  <AttachmentIcon file={file} />
                </div>
              </div>
              <div className="view-detail-attachment-text">
                <div>{file.name}</div>
                <span>File - {formatFileSize(file.size)}</span>
              </div>
              <div className="view-detail-attachment-date">{formatAttachmentDate(file.lastModified)}</div>
            </div>
          ))}
        </div>

        <div className="view-detail-footer">
          <button onClick={onClose} className="modal-btn-submit view-detail-button">Close</button>
        </div>
      </div>
    </div>
  );
}
