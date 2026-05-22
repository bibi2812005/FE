import { FILE_TAG_COLORS, FILE_TYPE_LABELS } from '../data';

/**
 * Returns Ant Design Tag color string for each document type.
 */
export function getFileTagColor(type) {
  return FILE_TAG_COLORS[type] || 'default';
}

/**
 * Returns human-readable label for document type.
 */
export function getFileTypeLabel(type) {
  return FILE_TYPE_LABELS[type] || 'Tệp';
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
