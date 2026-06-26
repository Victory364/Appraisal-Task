import { getFileExtension } from '../attachmentUtils';

import pdfIcon from '../../../assets/Fowgate Folder/pdf-file-svgrepo-com 1.svg';
import jgpIcon from '../../../assets/Fowgate Folder/jpg-svgrepo-com 1.svg'


export default function AttachmentIcon({ file }) {
  const extension = file.extension || getFileExtension(file.name);
  const fileType = file.type || '';
  const isImage = fileType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
  const isPdf = fileType === 'application/pdf' || extension === 'pdf';
  const isDocument = ['doc', 'docx'].includes(extension);

  if (isImage) {
    return (
      <img src={jgpIcon} alt="Jgp icon" style={{width:"36",height:"42"}} />
    );
  }

  if (isPdf) {
    return (
      <img src={pdfIcon} alt="Pdf icon" style={{width:"36",height:"42"}} />
    );
  }

  if (isDocument) {
    return (
      <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Document file">
        <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V37.5C0 39.9853 2.01472 42 4.5 42H31.5C33.9853 42 36 39.9853 36 37.5V12L24 0H4.5Z" fill="#2F80ED" />
        <path d="M24 0V12H36L24 0Z" fill="#1C5FB8" />
        <rect x="7" y="17" width="22" height="2.5" rx="1.25" fill="white" />
        <rect x="7" y="23" width="18" height="2.5" rx="1.25" fill="white" />
        <rect x="7" y="29" width="14" height="2.5" rx="1.25" fill="white" />
      </svg>
    );
  }

  return (
    <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="File">
      <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V37.5C0 39.9853 2.01472 42 4.5 42H31.5C33.9853 42 36 39.9853 36 37.5V12L24 0H4.5Z" fill="#64748B" />
      <path d="M24 0V12H36L24 0Z" fill="#475569" />
      <rect x="8" y="18" width="20" height="2.5" rx="1.25" fill="white" />
      <rect x="8" y="24" width="16" height="2.5" rx="1.25" fill="white" />
      <rect x="8" y="30" width="12" height="2.5" rx="1.25" fill="white" />
    </svg>
  );
}
