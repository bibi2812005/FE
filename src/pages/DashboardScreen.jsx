/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Table, Button, Tag, Modal, Form, Select, Upload, Tooltip, message, Segmented } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import FileIcon from '../components/FileIcon.jsx';
import { getFileTagColor, getFileTypeLabel, detectFileType } from '../utils/helpers.js';
import { TAB_OPTIONS, UPLOAD_TYPE_OPTIONS } from '../data';

const { Dragger } = Upload;

export default function DashboardScreen({
  documents,
  searchTerm,
  onAddDocument,
  onRemoveDocument,
  onSelectActiveDocument,
  currentUser,
  onLogout,
  onNavigate,
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [form] = Form.useForm();

  // Draggable floating assistant state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offsetStart, setOffsetStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setOffsetStart({ x: position.x, y: position.y });
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setOffsetStart({ x: position.x, y: position.y });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: offsetStart.x + (e.clientX - dragStart.x),
        y: offsetStart.y + (e.clientY - dragStart.y)
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, offsetStart]);

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPosition({
        x: offsetStart.x + (touch.clientX - dragStart.x),
        y: offsetStart.y + (touch.clientY - dragStart.y)
      });
    };
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart, offsetStart]);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesTab = activeTab === 'all' || doc.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleUploadSubmit = (values) => {
    let finalName = values.name;
    if (!finalName.includes('.')) finalName += `.${values.type}`;

    const newDoc = {
      id: 'doc_' + Date.now(),
      name: finalName,
      uploadedAt: 'Hôm nay, ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      size: values.size || '2.0 MB',
      type: values.type,
      content: values.content || `Nội dung mô phỏng chi tiết cho tài liệu học tập của ${finalName}.`,
    };

    onAddDocument(newDoc);
    form.resetFields();
    setShowUploadModal(false);
    message.success(`Đã tải lên "${finalName}" thành công!`);
  };

  const handleAskAIOnDoc = (doc) => {
    onSelectActiveDocument(doc);
    onNavigate('ai');
  };

  const columns = [
    {
      title: 'Tên tài liệu',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <FileIcon type={record.type} />
          <span
            className="font-semibold text-black hover:text-[#ff5c00] transition-colors cursor-pointer text-[13px] tracking-tight"
            onClick={() => handleAskAIOnDoc(record)}
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: 'Định dạng',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type) => (
        <Tag color={getFileTagColor(type)} className="font-bold text-[9px] uppercase rounded-full border-none px-2.5 py-0.5">
          {getFileTypeLabel(type)}
        </Tag>
      ),
    },
    {
      title: 'Ngày đồng bộ',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      width: 180,
      className: 'text-[12.5px] text-black/55 font-medium',
    },
    {
      title: 'Dung lượng',
      dataIndex: 'size',
      key: 'size',
      width: 120,
      className: 'text-[12.5px] text-black/60 font-semibold',
    },
    {
      title: '',
      key: 'actions',
      width: 180,
      align: 'right',
      render: (_, record) => (
        <div className="flex items-center justify-end gap-2.5">
          <Button
            type="primary"
            size="small"
            onClick={() => handleAskAIOnDoc(record)}
            className="font-bold text-[11px] rounded-lg h-7 px-3.5"
          >
            <i className="bi bi-chat-dots mr-1" /> Hỏi AI
          </Button>
          <Tooltip title="Xóa tạm thời">
            <Button
              type="text"
              danger
              size="small"
              className="text-black/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg h-7 w-7 flex items-center justify-center cursor-pointer"
              onClick={() => {
                onRemoveDocument(record.id);
                message.success('Đã chuyển tài liệu vào Thùng rác.');
              }}
            >
              <i className="bi bi-trash3 text-[13px]" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const gridContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const gridItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto px-4 md:px-8 pb-10 pt-4 text-left select-none relative">
      <div>
        
        {/* Title + Action bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-[23px] font-extrabold text-[#1d1d1f] tracking-tight">Thư viện của tôi</h2>
            <p className="text-[13px] text-black/50 mt-0.5 font-semibold">Quản lý và số hóa học phần học thuật cùng Trợ lý AI</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-[#ff8a00] to-[#ff5c00] text-white rounded-xl font-bold text-[13px] px-4.5 py-2 flex items-center gap-1.5 shadow-lg orange-glow cursor-pointer"
            >
              <i className="bi bi-cloud-arrow-up text-[14px]" /> Tải lên tài liệu
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const name = prompt('Nhập tên thư mục mới:');
                if (name) message.success(`Đã tạo thư mục "${name}"`);
              }}
              className="bg-black/[0.01] border border-black/8 hover:border-black/20 text-black rounded-xl font-semibold text-[13px] px-4 py-2 flex items-center gap-1.5 cursor-pointer"
            >
              <i className="bi bi-folder-plus text-[14px] text-black/60" /> Tạo mục mới
            </motion.button>

            <Segmented
              options={[
                { value: 'list', icon: <i className="bi bi-list-ul" /> },
                { value: 'grid', icon: <i className="bi bi-grid-3x3-gap" /> },
              ]}
              value={viewMode}
              onChange={setViewMode}
              className="p-0.5 rounded-xl border border-black/5 bg-black/[0.005]"
            />
          </div>
        </div>

        {/* Categories / Filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2.5">
          {TAB_OPTIONS.map((tab) => {
            const count = tab.value === 'all'
              ? documents.length
              : documents.filter((d) => d.type === tab.value).length;
            const isActive = activeTab === tab.value;

            // Soft luxury format color mapping
            const tabColors = {
              all: {
                active: 'bg-[#1d1d1f] text-white font-extrabold shadow-sm border border-[#1d1d1f]',
                inactive: 'bg-black/[0.015] text-black/60 border border-black/5 hover:border-black/20 hover:text-black font-semibold',
                badgeActive: 'bg-white/20 text-white',
                badgeInactive: 'bg-black/5 text-black/40'
              },
              pdf: {
                active: 'bg-red-500 text-white font-extrabold shadow-md shadow-red-500/10 border border-red-500',
                inactive: 'bg-red-50/50 text-red-600 border border-red-100/40 hover:bg-red-50 hover:text-red-700 font-semibold',
                badgeActive: 'bg-white/20 text-white',
                badgeInactive: 'bg-red-100/50 text-red-600'
              },
              docx: {
                active: 'bg-blue-500 text-white font-extrabold shadow-md shadow-blue-500/10 border border-blue-500',
                inactive: 'bg-blue-50/50 text-blue-600 border border-blue-100/40 hover:bg-blue-50 hover:text-blue-700 font-semibold',
                badgeActive: 'bg-white/20 text-white',
                badgeInactive: 'bg-blue-100/50 text-blue-600'
              },
              pptx: {
                active: 'bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/10 border border-orange-500',
                inactive: 'bg-orange-50/50 text-orange-600 border border-orange-100/40 hover:bg-orange-50 hover:text-orange-700 font-semibold',
                badgeActive: 'bg-white/20 text-white',
                badgeInactive: 'bg-orange-100/50 text-orange-600'
              },
              xlsx: {
                active: 'bg-emerald-500 text-white font-extrabold shadow-md shadow-emerald-500/10 border border-emerald-500',
                inactive: 'bg-emerald-50/50 text-emerald-600 border border-emerald-100/40 hover:bg-emerald-50 hover:text-emerald-700 font-semibold',
                badgeActive: 'bg-white/20 text-white',
                badgeInactive: 'bg-emerald-100/50 text-emerald-600'
              },
              txt: {
                active: 'bg-purple-500 text-white font-extrabold shadow-md shadow-purple-500/10 border border-purple-500',
                inactive: 'bg-purple-50/50 text-purple-600 border border-purple-100/40 hover:bg-purple-50 hover:text-purple-700 font-semibold',
                badgeActive: 'bg-white/20 text-white',
                badgeInactive: 'bg-purple-100/50 text-purple-600'
              }
            };

            const classes = tabColors[tab.value] || tabColors.all;

            return (
              <motion.button
                key={tab.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4.5 py-2 rounded-full text-[12px] transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive ? classes.active : classes.inactive
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? classes.badgeActive : classes.badgeInactive
                }`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Main List content viewport */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="premium-glass rounded-2xl border border-black/5 p-2 shadow-sm overflow-hidden flex-1"
            >
              <Table
                columns={columns}
                dataSource={filteredDocs}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  showTotal: (total) => `Tổng cộng ${total} tài liệu`,
                  className: 'px-4 font-semibold text-black/45 text-[12px]',
                }}
                locale={{ emptyText: <span className="text-black/35 text-[12.5px] font-semibold py-8 block text-center">Thư mục trống</span> }}
                size="middle"
              />
            </motion.div>
          ) : (
            <motion.div 
              key="grid-view"
              variants={gridContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1"
            >
              {filteredDocs.map((doc) => (
                <motion.div 
                  key={doc.id}
                  variants={gridItem}
                  className="bg-white rounded-2xl border border-black/5 p-5 shadow-sm flex flex-col justify-between group overflow-hidden relative hover-card-depth cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <Tag color={getFileTagColor(doc.type)} className="font-bold text-[9px] rounded-full uppercase border-none px-2 py-0.5">
                        {getFileTypeLabel(doc.type)}
                      </Tag>
                      <Button 
                        type="text" 
                        danger 
                        size="small" 
                        className="text-black/30 hover:text-red-500 hover:bg-red-500/10 rounded-lg h-7 w-7 flex items-center justify-center cursor-pointer"
                        onClick={(e) => { 
                          e.stopPropagation();
                          onRemoveDocument(doc.id); 
                          message.success('Đã chuyển tài liệu vào Thùng rác.'); 
                        }}
                      >
                        <i className="bi bi-trash3" />
                      </Button>
                    </div>
                    <div className="flex gap-3 items-center" onClick={() => handleAskAIOnDoc(doc)}>
                      <FileIcon type={doc.type} />
                      <h4 className="font-semibold text-[14.5px] text-black tracking-tight line-clamp-1 group-hover:text-[#ff5c00] transition-colors">{doc.name}</h4>
                    </div>
                    <p className="text-[12.5px] text-black/55 font-semibold leading-relaxed line-clamp-2 bg-black/[0.005] p-3 rounded-xl border border-black/5">
                      {doc.content || 'Nhấp "Hỏi AI" để bắt đầu tìm hiểu và số hóa tệp tin...'}
                    </p>
                  </div>
                  <div className="pt-3.5 border-t border-black/5 flex justify-between items-center mt-4">
                    <div className="text-[11px] text-black/40 font-semibold space-y-0.5">
                      <p>{doc.uploadedAt}</p>
                      <p>{doc.size}</p>
                    </div>
                    <Button 
                      type="primary" 
                      size="small" 
                      onClick={() => handleAskAIOnDoc(doc)} 
                      className="rounded-lg font-bold text-[11px] h-7 px-3"
                    >
                      <i className="bi bi-chat-dots mr-1" /> Hỏi AI
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Draggable AI Assistant with glowing ring */}
        <div
          className="fixed z-50 touch-none select-none"
          style={{
            bottom: '40px',
            right: '40px',
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <Tooltip title={isDragging ? "Đang kéo thả..." : "Kéo tôi đến bất kỳ góc nào!"} placement="left">
            <button
              onClick={() => {
                const moved = Math.abs(position.x - offsetStart.x) > 8 || Math.abs(position.y - offsetStart.y) > 8;
                if (!moved) onNavigate('ai');
              }}
              className={`w-[54px] h-[54px] bg-gradient-to-tr from-[#ff8a00] to-[#ff5c00] text-white rounded-full flex items-center justify-center border-2 border-white/20 shadow-2xl orange-glow hover:scale-105 active:scale-95 transition-all cursor-grab active:cursor-grabbing ${
                isDragging ? 'scale-110 shadow-2xl ring-4 ring-[#ff5c00]/30' : ''
              }`}
            >
              <i className={`bi bi-stars text-[22px] ${isDragging ? 'animate-pulse' : 'animate-bounce duration-[3s]'}`} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Upload Modal (Premium Vercel Glassmorphism) */}
      <Modal
        title={null}
        open={showUploadModal}
        onCancel={() => setShowUploadModal(false)}
        footer={null}
        width={480}
        styles={{ body: { padding: 0 } }}
        destroyOnClose
        centered
      >
        <div className="bg-[#fafafb] px-6 py-6 border-b border-black/5 text-black flex items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff5c00]/3 rounded-full blur-2xl pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-black/[0.01] border border-black/5 flex items-center justify-center text-[#ff5c00] orange-glow">
            <i className="bi bi-file-earmark-plus text-[20px]" />
          </div>
          <div className="text-left">
            <h3 className="text-[16px] font-bold text-black tracking-tight">Tải tài liệu lên</h3>
            <p className="text-[10px] text-black/40 font-bold uppercase tracking-wider mt-1">Đồng bộ học trình thông minh</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-b-2xl">
          <Dragger
            beforeUpload={(file) => {
              form.setFieldsValue({
                name: file.name,
                type: detectFileType(file.name),
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              });
              return false;
            }}
            showUploadList={false}
            className="!rounded-2xl !border-dashed !border-black/10 hover:!border-[#ff5c00]/40 !bg-black/[0.005] hover:!bg-[#ff5c00]/5 mb-6 transition-all duration-300 py-7"
          >
            <p className="ant-upload-drag-icon">
              <i className="bi bi-cloud-arrow-up text-[#ff5c00] text-[40px] animate-pulse" />
            </p>
            <p className="text-[13px] font-bold text-black mt-4">Kéo & thả tệp tin học tập vào đây</p>
            <p className="text-[11.5px] text-black/50 mt-1 font-semibold">
              Hoặc <span className="text-[#ff5c00] font-bold cursor-pointer">Bấm chọn tệp tin</span>
            </p>
            <p className="text-[9px] text-[#ff5c00] font-bold uppercase tracking-wider bg-[#ff5c00]/10 border border-[#ff5c00]/20 rounded-full px-3 py-1 mt-3 inline-block">
              Hỗ trợ PDF, DOCX, XLSX, Hình ảnh
            </p>
          </Dragger>

          <Form form={form} layout="vertical" onFinish={handleUploadSubmit} initialValues={{ type: 'pdf', size: '1.5 MB' }}>
            <Form.Item
              label={<span className="text-[10px] font-bold text-black/50 uppercase tracking-wider">Tên tài liệu</span>}
              name="name"
              rules={[{ required: true, message: 'Vui lòng điền tên tệp!' }]}
            >
              <input 
                type="text" 
                placeholder="Giao_Trinh_Khai_Pha_Du_Lieu.pdf" 
                className="w-full bg-black/[0.01] border border-black/8 rounded-xl px-3.5 py-2.5 text-black text-[13px] outline-none focus:border-[#ff5c00] transition-all"
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item label={<span className="text-[10px] font-bold text-black/50 uppercase tracking-wider">Loại tài liệu</span>} name="type">
                <Select className="font-semibold text-[13px]" popupClassName="rounded-xl" options={UPLOAD_TYPE_OPTIONS} />
              </Form.Item>
              <Form.Item label={<span className="text-[10px] font-bold text-black/50 uppercase tracking-wider">Dung lượng tệp</span>} name="size">
                <input 
                  type="text" 
                  placeholder="2.5 MB" 
                  className="w-full bg-black/[0.01] border border-black/8 rounded-xl px-3.5 py-2.5 text-black text-[13px] outline-none focus:border-[#ff5c00] transition-all"
                />
              </Form.Item>
            </div>

            <Form.Item label={<span className="text-[10px] font-bold text-black/50 uppercase tracking-wider">Nội dung cốt lõi (Để Trợ lý AI phân tích)</span>} name="content">
              <textarea 
                rows={3} 
                placeholder="Điền hoặc dán tóm tắt lý thuyết, nội dung cốt lõi của môn học vào đây..." 
                className="w-full bg-black/[0.01] border border-black/8 rounded-xl px-3.5 py-2.5 text-black text-[13px] outline-none focus:border-[#ff5c00] transition-all resize-none"
              />
            </Form.Item>

            <div className="flex gap-3 justify-end pt-4 border-t border-black/5">
              <Button onClick={() => setShowUploadModal(false)} className="rounded-xl font-semibold text-[12px] border-black/10 hover:border-black/20 h-9">
                Hủy thao tác
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="rounded-xl font-bold text-[12.5px] h-9"
              >
                Xác nhận tải lên
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
