/**
 * Centralized configurations and static datasets relating to file tags, labels, and forms.
 */

export const FILE_TAG_COLORS = {
  pdf: 'red',
  docx: 'blue',
  xlsx: 'green',
  image: 'purple',
  video: 'magenta',
};

export const FILE_TYPE_LABELS = {
  pdf: 'PDF',
  docx: 'Word',
  xlsx: 'Excel',
  image: 'Hình ảnh',
  video: 'Video',
  other: 'Khác',
};

export const TAB_OPTIONS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'PDF', value: 'pdf' },
  { label: 'Word', value: 'docx' },
  { label: 'Excel', value: 'xlsx' },
  { label: 'Hình ảnh', value: 'image' },
  { label: 'Video', value: 'video' },
];

export const UPLOAD_TYPE_OPTIONS = [
  { value: 'pdf', label: 'Tài liệu PDF' },
  { value: 'docx', label: 'Văn bản Word' },
  { value: 'xlsx', label: 'Bảng tính Excel' },
  { value: 'image', label: 'Hình ảnh' },
  { value: 'video', label: 'Video bài giảng' },
  { value: 'other', label: 'Loại khác' },
];
