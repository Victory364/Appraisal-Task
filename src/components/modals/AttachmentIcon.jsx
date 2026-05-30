import { getFileExtension } from './attachmentUtils';

export default function AttachmentIcon({ file }) {
  const extension = file.extension || getFileExtension(file.name);
  const fileType = file.type || '';
  const isImage = fileType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
  const isPdf = fileType === 'application/pdf' || extension === 'pdf';
  const isDocument = ['doc', 'docx'].includes(extension);

  if (isImage) {
    return (
      <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Image file">
        <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V37.5C0 39.9853 2.01472 42 4.5 42H31.5C33.9853 42 36 39.9853 36 37.5V12L24 0H4.5Z" fill="#1F66C7" />
        <path d="M24 0V12H36L24 0Z" fill="#164EA0" />
        <circle cx="12" cy="19" r="3" fill="white" />
        <path d="M7 32L14 25L18 29L22 24L29 32H7Z" fill="white" />
      </svg>
    );
  }

  if (isPdf) {
    return (
      <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PDF file">
        <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V37.5C0 39.9853 2.01472 42 4.5 42H31.5C33.9853 42 36 39.9853 36 37.5V12L24 0H4.5Z" fill="#E53935" />
        <path d="M24 0V12H36L24 0Z" fill="#B71C1C" />
        <rect x="4" y="6" width="12" height="7" rx="1" fill="white" />
        <text x="5.5" y="11" fill="#E53935" fontSize="5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
        <path d="M10.5 32C9 32 7.5 30 7.5 27C7.5 24 9.5 22 10.5 22C11.5 22 12.5 23 13 25C14.5 23 17.5 20 19 20C21 20 23 21.5 23 23C23 24.5 21.5 26 19.5 26C17 26 14.5 28 13.5 30C12 31.5 11.5 32 10.5 32Z" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M11 24C11 25.5 10 28 10.5 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
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
