

/**
 * Returns Ant Design Tag color string for each document type.
 */
export function getFileTagColor(type) {
  const colorMap = {
    pdf: 'red',
    docx: 'blue',
    xlsx: 'green',
    image: 'purple',
    video: 'magenta',
  };
  return colorMap[type] || 'default';
}

/**
 * Returns human-readable label for document type.
 */
export function getFileTypeLabel(type) {
  const labelMap = {
    pdf: 'PDF',
    docx: 'Word',
    xlsx: 'Excel',
    image: 'Hình ảnh',
    video: 'Video',
    other: 'Khác',
  };
  return labelMap[type] || 'Tệp';
}

/**
 * Detects document type from file extension.
 */
export function detectFileType(fileName) {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (['docx', 'doc'].includes(ext)) return 'docx';
  if (['xlsx', 'xls'].includes(ext)) return 'xlsx';
  if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext)) return 'image';
  if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) return 'video';
  return 'other';
}
