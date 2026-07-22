import { useState, useRef } from 'react';
import '../ModalBase/ModalBase.css';
import '../WriteResignationModal/WriteResignationModal.css';
import './ViewResignationModal.css';
import addExpense from '../../../assets/Fowgate Folder/Add Expense Claim.svg';
import arrowDown from '../../../assets/Fowgate Folder/arrow-down-01.svg';
import bIcon from '../../../assets/Fowgate Folder/Frame (2).svg';
import iIcon from '../../../assets/Fowgate Folder/Frame-1 (2).svg';
import uIcon from '../../../assets/Fowgate Folder/Frame-2 (2).svg';
import Icon123 from '../../../assets/Fowgate Folder/Frame-3 (1).svg';
import bluestar from '../../../assets/Fowgate Folder/Frame-4.svg';
import checklist from '../../../assets/Fowgate Folder/check-list.svg';

export default function ViewResignationModal({ resignation, onClose, onSave }) {
  const [recipient, setRecipient] = useState(resignation?.recipient || 'Sophia Bennett');
  const [letter, setLetter] = useState(resignation?.letter || '');
  const [signature] = useState(resignation?.signature || null);
  const [signatureSize] = useState(resignation?.signatureSize || 92);
  const [signatureOffsetX] = useState(resignation?.signatureOffsetX || 0);
  const [signatureOffsetY] = useState(resignation?.signatureOffsetY || 0);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && resignation?.letter && !letter) {
      editorRef.current.innerHTML = resignation.letter;
    }
  }, [resignation]);

  const handleInput = () => {
    if (editorRef.current) {
      setLetter(editorRef.current.innerHTML);
    }
  };

  const applyFormat = (command) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, null);
    if (editorRef.current) {
      setLetter(editorRef.current.innerHTML);
    }
  };

  const handleTemplateChange = (e) => {
    const val = e.target.value;
    let templateHtml = '';
    if (val === 'standard') {
      templateHtml = `Dear Sophia,<br/><br/>I am writing to formally resign from my position. Thank you for the growth opportunities during my time at Fowgate Limited.<br/><br/>Best regards,<br/>James Peterson`;
    } else if (val === 'notice') {
      templateHtml = `Dear Sophia,<br/><br/>Please accept this letter as formal notification that I am resigning from my position. My last day will be 14 days from today.<br/><br/>Best regards,<br/>James Peterson`;
    }
    if (templateHtml) {
      if (editorRef.current) {
        editorRef.current.innerHTML = templateHtml;
      }
      setLetter(templateHtml);
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    const finalLetter = editorRef.current ? editorRef.current.innerHTML : letter;
    onSave({
      ...resignation,
      recipient,
      letter: finalLetter,
      signature,
      signatureSize,
      signatureOffsetX,
      signatureOffsetY
    });
  };

  const getCharCount = () => {
    if (editorRef.current) {
      return editorRef.current.innerText.replace(/\n/g, '').length;
    }
    return letter.replace(/<[^>]*>/g, '').length;
  };

  return (
    <div className="modal-overlay">
      <div className="claim-modal resignation-modal view-resignation-modal">
        <div className="claim-modal-header resignation-modal-header">
          <h3 className="claim-modal-title">
            <img src={addExpense} alt="" className="claim-modal-title-icon resignation-title-icon" />
            View Resignation
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close" aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSave} className="resignation-form">
          <div className="resignation-row resignation-subject-row">
            <span className="resignation-muted-label">Re:</span>
            <span className="resignation-subject">{resignation?.subject || 'Resignation Letter'}</span>
          </div>

          <div className="resignation-field">
            <label htmlFor="view-resignation-recipient">TO;</label>
            <div className="resignation-select-wrapper">
              <select
                id="view-resignation-recipient"
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                className="resignation-select"
              >
                <option value="Sophia Bennett">Sophia Bennett</option>
                <option value="HR Department">HR Department</option>
                <option value="Line Manager">Line Manager</option>
              </select>
              <img src={arrowDown} alt="" className="resignation-select-arrow" />
            </div>
          </div>

          <div className="resignation-compose-header">
            <label htmlFor="view-resignation-letter">Write Letter</label>
            <div className="resignation-template-select-wrapper">
              <select className="resignation-template-select" defaultValue="" onChange={handleTemplateChange}>
                <option value="">Choose Template</option>
                <option value="standard">Standard resignation</option>
                <option value="notice">Notice period</option>
              </select>
              <img src={arrowDown} alt="" className="resignation-select-arrow" />
            </div>
          </div>

          <div className="resignation-editor-wrap view-resignation-editor-wrap">
            <div
              ref={editorRef}
              contentEditable={true}
              onInput={handleInput}
              onBlur={handleInput}
              suppressContentEditableWarning={true}
              className="resignation-editor view-resignation-editor"
              data-placeholder="Type here"
            />
            <div className="resignation-editor-toolbar">
              <div className="resignation-format-actions">
                <button type="button" onMouseDown={(e) => { e.preventDefault(); applyFormat('bold'); }} title="Bold">
                  <img src={bIcon} alt="Bold" />
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); applyFormat('italic'); }} title="Italic">
                  <img src={iIcon} alt="Italic" />
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); applyFormat('underline'); }} title="Underline">
                  <img src={uIcon} alt="Underline" />
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); applyFormat('insertUnorderedList'); }} title="Bullet List">
                  <img src={checklist} alt="Checklist" />
                </button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); applyFormat('insertOrderedList'); }} title="Numbered List">
                  <img src={Icon123} alt="Numbered List" />
                </button>
                <button type="button" title="AI Assist">
                  <img src={bluestar} alt="AI Assist" />
                </button>
              </div>
              <span className="resignation-counter">{getCharCount()}/1500</span>
            </div>
          </div>

          <div className="view-resignation-signature-row">
            <div className="signature-block">
              <div className="signature-preview-box">
                {signature && (
                  <img
                    src={signature}
                    alt="Selected signature"
                    className="signature-preview-image"
                    style={{
                      width: `${signatureSize}px`,
                      transform: `translate(${signatureOffsetX}px, ${signatureOffsetY}px)`
                    }}
                  />
                )}
              </div>
              <span className="signature-line"></span>
              <span className="signature-caption signature-name">Samuel Adeyemi</span>
            </div>
            <div className="signature-block">
              <span className="signature-date">{resignation?.submittedAt || '8 Nov, 2024'}</span>
              <span className="signature-line"></span>
              <span className="signature-caption">Date</span>
            </div>
          </div>

          <div className="claim-modal-actions">
            <button type="button" onClick={onClose} className="modal-btn-cancel resignation-cancel-btn">Cancel</button>
            <button type="submit" className="modal-btn-submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
