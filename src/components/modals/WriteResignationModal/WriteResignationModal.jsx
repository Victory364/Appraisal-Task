import { useState, useEffect, useRef } from 'react';
import '../ModalBase/ModalBase.css';
import './WriteResignationModal.css';
import addExpense from '../../../assets/Fowgate Folder/Add Expense Claim.svg'
import uploadIcon from '../../../assets/Fowgate Folder/upload-01.svg';
import arrowDown from '../../../assets/Fowgate Folder/arrow-down-01.svg';
import bIcon from '../../../assets/Fowgate Folder/Frame (2).svg';
import iIcon from '../../../assets/Fowgate Folder/Frame-1 (2).svg';
import uIcon from '../../../assets/Fowgate Folder/Frame-2 (2).svg';
import Icon123 from '../../../assets/Fowgate Folder/Frame-3 (1).svg';
import bluestar from '../../../assets/Fowgate Folder/Frame-4.svg';
import checklist from '../../../assets/Fowgate Folder/check-list.svg';

const formatCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export default function WriteResignationModal({ onClose, onSubmit, initialData }) {
  const [recipient, setRecipient] = useState(initialData?.recipient || '');
  const [letter, setLetter] = useState(initialData?.letter || '');
  const [signature, setSignature] = useState(initialData?.signature || null);
  const [signatureSize, setSignatureSize] = useState(initialData?.signatureSize || 92);
  const [signatureOffsetX, setSignatureOffsetX] = useState(initialData?.signatureOffsetX || 0);
  const [signatureOffsetY, setSignatureOffsetY] = useState(initialData?.signatureOffsetY || 0);
  const [dragState, setDragState] = useState(null);
  const editorRef = useRef(null);
  const currentDate = formatCurrentDate();

  useEffect(() => {
    if (editorRef.current && initialData?.letter && !letter) {
      editorRef.current.innerHTML = initialData.letter;
    }
  }, [initialData]);

  const handleSignatureUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSignature(reader.result);
      setSignatureSize(92);
      setSignatureOffsetX(0);
      setSignatureOffsetY(0);
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDownMove = (e) => {
    e.preventDefault();
    setDragState({
      type: 'move',
      startX: e.clientX,
      startY: e.clientY,
      initialX: signatureOffsetX,
      initialY: signatureOffsetY
    });
  };

  const handleMouseDownResize = (e, corner) => {
    e.stopPropagation();
    e.preventDefault();
    setDragState({
      type: 'resize',
      startX: e.clientX,
      startY: e.clientY,
      initialSize: signatureSize,
      corner
    });
  };

  useEffect(() => {
    if (!dragState) return;

    const handleMouseMove = (e) => {
      if (dragState.type === 'move') {
        const dx = e.clientX - dragState.startX;
        const dy = e.clientY - dragState.startY;
        setSignatureOffsetX(dragState.initialX + dx);
        setSignatureOffsetY(dragState.initialY + dy);
      } else if (dragState.type === 'resize') {
        const dx = e.clientX - dragState.startX;
        const multiplier = (dragState.corner === 'br' || dragState.corner === 'tr') ? 1 : -1;
        const newSize = Math.max(40, Math.min(240, dragState.initialSize + dx * multiplier));
        setSignatureSize(newSize);
      }
    };

    const handleMouseUp = () => {
      setDragState(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalLetter = editorRef.current ? editorRef.current.innerHTML : letter;
    onSubmit({
      subject: 'Resignation Letter',
      recipient: recipient || 'Sophia Bennett',
      letter: finalLetter,
      submittedAt: currentDate,
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
      <div className="claim-modal resignation-modal write-resignation-modal">
        <div className="claim-modal-header resignation-modal-header">
          <h3 className="claim-modal-title">
            <img src={addExpense} alt="" className="claim-modal-title-icon resignation-title-icon" />
            Write Letter
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close" aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="resignation-form">
          <div className="resignation-row resignation-subject-row">
            <span className="resignation-muted-label">Re:</span>
            <span className="resignation-subject">Resignation Letter</span>
          </div>

          <div className="resignation-field">
            <label htmlFor="resignation-recipient">TO;</label>
            <div className="resignation-select-wrapper">
              <select
                id="resignation-recipient"
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                className="resignation-select"
              >
                <option value="">Select</option>
                <option value="Sophia Bennett">Sophia Bennett</option>
                <option value="HR Department">HR Department</option>
                <option value="Line Manager">Line Manager</option>
              </select>
              <img src={arrowDown} alt="" className="resignation-select-arrow" />
            </div>
          </div>

          <div className="resignation-compose-header">
            <label htmlFor="resignation-letter">Write Letter</label>
            <div className="resignation-template-select-wrapper">
              <select className="resignation-template-select" defaultValue="" onChange={handleTemplateChange}>
                <option value="">Choose Template</option>
                <option value="standard">Standard resignation</option>
                <option value="notice">Notice period</option>
              </select>
              <img src={arrowDown} alt="" className="resignation-select-arrow" />
            </div>
          </div>

          <div className="resignation-editor-wrap">
            <div
              ref={editorRef}
              contentEditable={true}
              onInput={handleInput}
              onBlur={handleInput}
              suppressContentEditableWarning={true}
              className="resignation-editor"
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

          <div className="write-resignation-signature-row">
            <div className="signature-block">
              <input
                id="write-signature-upload"
                type="file"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="signature-upload-input"
              />
              {!signature && (
                <label htmlFor="write-signature-upload" className="signature-upload-trigger">
                  <img src={uploadIcon} alt="" />
                  Attach Signature
                </label>
              )}
              {signature && (
                <div className="signature-preview-box">
                  <div
                    className="signature-transform-wrapper"
                    style={{
                      width: `${signatureSize}px`,
                      transform: `translate(${signatureOffsetX}px, ${signatureOffsetY}px)`
                    }}
                    onMouseDown={handleMouseDownMove}
                  >
                    <img src={signature} alt="Signature" className="signature-preview-image" />
                    <div className="transform-handle corner-tl" onMouseDown={(e) => handleMouseDownResize(e, 'tl')} />
                    <div className="transform-handle corner-tr" onMouseDown={(e) => handleMouseDownResize(e, 'tr')} />
                    <div className="transform-handle corner-bl" onMouseDown={(e) => handleMouseDownResize(e, 'bl')} />
                    <div className="transform-handle corner-br" onMouseDown={(e) => handleMouseDownResize(e, 'br')} />
                    <button
                      type="button"
                      className="signature-remove-btn"
                      onClick={() => setSignature(null)}
                      title="Remove signature"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
              <span className="signature-line"></span>
              <span className="signature-caption signature-name">Samuel Adeyemi</span>
            </div>
            <div className="signature-block">
              <span className="signature-date">{currentDate}</span>
              <span className="signature-line"></span>
              <span className="signature-caption">Date</span>
            </div>
          </div>

          <div className="claim-modal-actions">
            <button type="button" onClick={onClose} className="modal-btn-cancel resignation-cancel-btn">Cancel</button>
            <button type="submit" className="modal-btn-submit">Submit Letter</button>
          </div>
        </form>
      </div>
    </div>
  );
}
