import { useState } from 'react';
import { AtSign, Paperclip, Smile, X } from 'lucide-react';
import './PayrollCommentsPanel.css';

const DEFAULT_COMMENTS = [
  {
    id: 'c-figma',
    author: 'Sophia Bennett',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    date: '11 Dec, 2024, 4:17 PM',
    text: 'The expense details have been reviewed and is in line with company policies. Reimbursement will be processed shortly.'
  }
];

export default function PayrollCommentsPanel({ claim, onClose, onSaveComment }) {
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('comments');

  const [commentList, setCommentList] = useState(() => {
    if (claim?.comments && claim.comments.length > 0) {
      return claim.comments;
    }
    if (claim?.reviewerComment) {
      return [
        {
          id: 'c-reviewed',
          author: claim.approvedBy || 'Sophia Bennett',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
          date: claim.dateReviewed || '11 Dec, 2024, 4:17 PM',
          text: claim.reviewerComment
        }
      ];
    }
    return DEFAULT_COMMENTS;
  });

  const commentCount = commentList.length;

  const save = () => {
    if (!comment.trim()) return;
    const newCommentObj = {
      id: Date.now().toString(),
      author: 'HR Manager',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      date: 'Just now',
      text: comment.trim()
    };
    setCommentList((prev) => [newCommentObj, ...prev]);
    if (onSaveComment && claim?.id) {
      onSaveComment(claim.id, comment.trim());
    }
    setComment('');
  };

  return (
    <div
      className="payroll-comments-overlay"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <section
        className="payroll-comments-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payroll-comments-title"
      >
        <header className="payroll-comments-header">
          <h3 id="payroll-comments-title">Comments ({commentCount})</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comments"
            className="payroll-close-icon-btn"
          >
            <X size={18} />
          </button>
        </header>

        <div className="payroll-comment-composer">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            alt="Current User"
            className="payroll-composer-avatar"
          />
          <div className="payroll-comment-editor">
            <textarea
              maxLength={500}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type your comment here..."
            />
            <div className="payroll-comment-editor-footer">
              <span className="payroll-composer-tools">
                <button type="button" aria-label="Add emoji"><Smile size={13} /></button>
                <button type="button" aria-label="Mention user"><AtSign size={13} /></button>
                <button type="button" aria-label="Add attachment"><Paperclip size={13} /></button>
              </span>
              <small>{comment.length}/500</small>
            </div>
          </div>
        </div>

        <div className="payroll-add-comment-row">
          <button type="button" onClick={save}>
            Add Comment
          </button>
        </div>

        <div className="payroll-comment-tabs">
          <button
            type="button"
            className={activeTab === 'comments' ? 'active' : ''}
            onClick={() => setActiveTab('comments')}
          >
            Comments ({commentCount})
          </button>
          <button
            type="button"
            className={activeTab === 'activity' ? 'active' : ''}
            onClick={() => setActiveTab('activity')}
          >
            Activity (0)
          </button>
        </div>

        <div className="payroll-comment-list">
          {activeTab === 'comments' ? (
            commentList.length > 0 ? (
              commentList.map((item) => (
                <article className="payroll-comment-item" key={item.id}>
                  <img src={item.avatar} alt={item.author} />
                  <div className="payroll-comment-content">
                    <div className="payroll-comment-header-row">
                      <strong>{item.author}</strong>
                      <time>{item.date}</time>
                    </div>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="payroll-no-comments">No comments yet.</p>
            )
          ) : (
            <p className="payroll-no-comments">No activity recorded yet.</p>
          )}
        </div>

        <footer className="payroll-comments-footer">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}
