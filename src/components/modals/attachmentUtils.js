export const getFileExtension = (fileName = '') => {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

export const getAttachmentMeta = (file) => ({
  name: file.name,
  size: file.size,
  type: file.type || '',
  extension: getFileExtension(file.name),
  lastModified: file.lastModified || Date.now()
});

export const formatFileSize = (size) => {
  if (!size) return '0KB';
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)}MB`;
  return `${Math.max(1, Math.round(size / 1024))}KB`;
};

export const formatAttachmentDate = (dateValue) => {
  const date = new Date(dateValue || Date.now());
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB');
};
