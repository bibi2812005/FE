/**
 * Reusable FileIcon component — Bootstrap Icons for document types.
 */
export default function FileIcon({ type, className = '', style = {} }) {
  const iconConfig = {
    pdf: { icon: 'bi-file-earmark-pdf-fill', color: '#ff3b30' },
    docx: { icon: 'bi-file-earmark-word-fill', color: '#0071e3' },
    xlsx: { icon: 'bi-file-earmark-excel-fill', color: '#34c759' },
    image: { icon: 'bi-file-earmark-image-fill', color: '#af52de' },
    video: { icon: 'bi-file-earmark-play-fill', color: '#ff2d55' },
  };

  const config = iconConfig[type] || { icon: 'bi-file-earmark-fill', color: '#86868b' };

  return (
    <i
      className={`bi ${config.icon} ${className}`}
      style={{ color: config.color, fontSize: 18, ...style }}
    />
  );
}
