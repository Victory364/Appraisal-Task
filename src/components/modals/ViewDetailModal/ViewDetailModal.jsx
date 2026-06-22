import '../ModalBase/ModalBase.css';
import './ViewDetailModal.css';
import viewDetailIcon from '../../../assets/Fowgate Folder/file-02.svg';
import AttachmentIcon from '../AttachmentIcon/AttachmentIcon';
import { formatAttachmentDate, formatFileSize } from '../attachmentUtils';

export default function ViewDetailModal({ claim, formatCurrency, onClose }) {
  const dateCreated = claim.dateCreated || claim.date || '-';
  const dateSubmitted = claim.dateSubmitted || claim.dateCreated || claim.date || '-';
  const dateApproved = claim.dateApproved || '-';
  const lastEditedDate = claim.lastEdited || claim.updatedAt || dateSubmitted;

  return (
    <div className="modal-overlay">
      <div className="claim-modal view-detail-modal">
        <div className="claim-modal-header view-detail-header">
          <h3 className="claim-modal-title view-detail-title">
            <img src={viewDetailIcon} alt="View Detail" />
            View Expense Claim
          </h3>
          <button onClick={onClose} className="claim-modal-close view-detail-close">&times;</button>
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
              <strong>{dateCreated}</strong>
            </div>
            <div>
              <div>Date Submitted</div>
              <strong>{dateSubmitted}</strong>
            </div>
            <div>
              <div>Date Approved</div>
              <strong>{dateApproved}</strong>
            </div>
          </div>

          <div className="view-detail-note-grid">
            <div className="view-detail-note-card view-detail-note-description">
              <div className="view-detail-note-title">Description</div>
              <p>{claim.purpose}</p>
              <span>Last edited: {lastEditedDate}</span>
            </div>
            <div className="view-detail-note-card view-detail-note-extra">
              <div className="view-detail-note-title">Extra Note</div>
              <p>{claim.extraNote || 'No extra note provided.'}</p>
              <span>Last edited: {lastEditedDate}</span>
            </div>
          </div>

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
                <span>2 pages &bull; {formatFileSize(file.size)}</span>
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
