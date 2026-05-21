import {
  FileTextOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  FileOutlined,
} from '@ant-design/icons';

/**
 * Reusable FileIcon component representing the document type.
 */
export default function FileIcon({ type, className, style }) {
  const iconMap = {
    pdf: <FileTextOutlined style={{ color: '#ef4444', fontSize: 18, ...style }} className={className} />,
    docx: <FileWordOutlined style={{ color: '#3b82f6', fontSize: 18, ...style }} className={className} />,
    xlsx: <FileExcelOutlined style={{ color: '#22c55e', fontSize: 18, ...style }} className={className} />,
    image: <FileImageOutlined style={{ color: '#a855f7', fontSize: 18, ...style }} className={className} />,
    video: <VideoCameraOutlined style={{ color: '#ec4899', fontSize: 18, ...style }} className={className} />,
  };

  return iconMap[type] || <FileOutlined style={{ color: '#94a3b8', fontSize: 18, ...style }} className={className} />;
}
