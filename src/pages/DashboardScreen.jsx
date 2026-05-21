/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Table, Button, Tag, Modal, Form, Input, Select, Upload, Tooltip, message, Segmented,
} from 'antd';
import {
  UploadOutlined,
  FolderAddOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  MessageOutlined,
  DeleteOutlined,
  RobotOutlined,
  InboxOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import AppHeader from '../components/AppHeader.jsx';
import FileIcon from '../components/FileIcon.jsx';
import { getFileTagColor, getFileTypeLabel, detectFileType } from '../utils/helpers.js';

const { Dragger } = Upload;
const { TextArea } = Input;

export default function DashboardScreen({
  documents,
  onAddDocument,
  onRemoveDocument,
  onSelectActiveDocument,
  currentUser,
  onLogout,
  onNavigate,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [form] = Form.useForm();

  // Floating draggable bot state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offsetStart, setOffsetStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
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
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      const newX = offsetStart.x + dx;
      const newY = offsetStart.y + dy;
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

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
      const dx = touch.clientX - dragStart.x;
      const dy = touch.clientY - dragStart.y;
      setPosition({ x: offsetStart.x + dx, y: offsetStart.y + dy });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

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
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || doc.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleUploadSubmit = (values) => {
    let finalName = values.name;
    if (!finalName.includes('.')) {
      finalName += `.${values.type}`;
    }

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

  // Table columns
  const columns = [
    {
      title: 'Tên tài liệu',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <FileIcon type={record.type} />
          <span
            className="font-bold text-[#0b1c30] hover:text-[#ea580c] transition-all cursor-pointer text-xs"
            onClick={() => handleAskAIOnDoc(record)}
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type) => (
        <Tag color={getFileTagColor(type)} className="font-bold text-[10px] uppercase rounded-full">
          {getFileTypeLabel(type)}
        </Tag>
      ),
    },
    {
      title: 'Ngày tải lên',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      width: 160,
      className: 'text-xs text-[#5d5f5f]',
    },
    {
      title: 'Kích thước',
      dataIndex: 'size',
      key: 'size',
      width: 120,
      className: 'text-xs text-[#5d5f5f]',
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 200,
      align: 'right',
      render: (_, record) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="primary"
            ghost
            size="small"
            icon={<MessageOutlined />}
            onClick={() => handleAskAIOnDoc(record)}
            className="font-bold text-xs rounded-xl"
          >
            Hỏi AI
          </Button>
          <Tooltip title="Xóa tạm thời">
            <Button
              type="text"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => {
                onRemoveDocument(record.id);
                message.success('Đã chuyển tài liệu vào Thùng rác.');
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const tabOptions = [
    { label: 'Tất cả', value: 'all' },
    { label: 'PDF', value: 'pdf' },
    { label: 'Word', value: 'docx' },
    { label: 'Excel', value: 'xlsx' },
    { label: 'Hình ảnh', value: 'image' },
    { label: 'Video', value: 'video' },
  ];

  return (
    <div className="flex-1 w-full flex flex-col min-h-screen text-left">
      <main className="flex-1 p-6 md:p-8 flex flex-col min-h-screen text-left relative select-none">
        <AppHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Title + Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#0b1c30]">Tất cả tài liệu</h2>
            <p className="text-xs text-[#5d5f5f] mt-0.5 font-semibold">Quản lý và tóm tắt tri thức tập trung tối ưu</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => setShowUploadModal(true)}
              className="rounded-xl font-bold text-xs bg-gradient-to-r from-[#ea580c] to-amber-500 hover:from-[#c2410c] hover:to-orange-500 border-none h-9 shadow-md shadow-orange-500/10 cursor-pointer"
            >
              Tải tài liệu mới
            </Button>
            <Button
              icon={<FolderAddOutlined />}
              onClick={() => {
                const name = prompt('Nhập tên thư mục mới:');
                if (name) message.success(`Tạo thư mục "${name}" thành công.`);
              }}
              className="rounded-xl font-bold text-xs h-9 cursor-pointer"
            >
              Tạo thư mục mới
            </Button>
            <Segmented
              options={[
                { value: 'list', icon: <UnorderedListOutlined /> },
                { value: 'grid', icon: <AppstoreOutlined /> },
              ]}
              value={viewMode}
              onChange={setViewMode}
              className="p-0.5 rounded-xl border border-slate-200/40 bg-white"
            />
          </div>
        </div>

        {/* Filter Tabs (Sleek Tailwind Pills) */}
        <div className="mb-6 flex flex-wrap gap-2.5">
          {tabOptions.map((tab) => {
            const count = tab.value === 'all'
              ? documents.length
              : documents.filter((d) => d.type === tab.value).length;
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-tr from-[#ea580c] to-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200/50 hover:border-[#ea580c]/30 hover:text-[#ea580c]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-3xl border border-slate-200/40 p-2 shadow-sm overflow-hidden flex-1 animate-scale-up">
            <Table
              columns={columns}
              dataSource={filteredDocs}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Hiển thị ${total} tài liệu học tập`,
                className: 'px-4',
              }}
              locale={{ emptyText: 'Không tìm thấy tài liệu nào' }}
              className="rounded-2xl"
              size="middle"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 animate-scale-up">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl border border-slate-200/40 p-5 soft-shadow flex flex-col justify-between group overflow-hidden relative hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <Tag color={getFileTagColor(doc.type)} className="font-extrabold text-[10px] rounded-full uppercase">
                      {getFileTypeLabel(doc.type)}
                    </Tag>
                    <Button type="text" danger size="small" icon={<DeleteOutlined />} onClick={() => { onRemoveDocument(doc.id); message.success('Đã chuyển vào Thùng rác.'); }} />
                  </div>
                  <div className="flex gap-3 items-center mb-3">
                    <FileIcon type={doc.type} />
                    <h4 className="font-extrabold text-sm text-[#0b1c30] line-clamp-1 group-hover:text-[#ea580c] transition-all">{doc.name}</h4>
                  </div>
                  <p className="text-[11px] text-[#5d5f5f] font-semibold leading-relaxed line-clamp-2 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100/50">
                    {doc.content || 'Nhấp "Hỏi AI" để nạp tệp dữ liệu vào phiên làm việc mới.'}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-3">
                  <div className="text-[10px] text-[#5d5f5f]/60">
                    <p>{doc.uploadedAt}</p>
                    <p className="font-bold">{doc.size}</p>
                  </div>
                  <Button type="primary" size="small" icon={<MessageOutlined />} onClick={() => handleAskAIOnDoc(doc)} className="rounded-xl font-bold text-xs bg-gradient-to-r from-[#ea580c] to-amber-500 border-none h-7">
                    Hỏi AI
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Draggable AI Bot FAB */}
        <div
          className="fixed z-50 touch-none select-none"
          style={{
            bottom: '30px',
            right: '40px',
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <Tooltip title={isDragging ? "Đang kéo thả..." : "Kéo thả tôi đi bất kỳ đâu!"} placement="left">
            <button
              onClick={() => {
                const moved = Math.abs(position.x - offsetStart.x) > 8 || Math.abs(position.y - offsetStart.y) > 8;
                if (!moved) {
                  onNavigate('ai');
                }
              }}
              className={`w-14 h-14 bg-gradient-to-tr from-[#ea580c] to-amber-500 hover:from-[#c2410c] hover:to-orange-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-grab active:cursor-grabbing ${
                isDragging ? 'scale-110 shadow-orange-500/30' : ''
              }`}
            >
              <RobotOutlined style={{ fontSize: 24 }} className={isDragging ? "animate-pulse" : "animate-bounce"} />
            </button>
          </Tooltip>
        </div>
      </main>

      {/* Upload Modal - Beautifully Redesigned Center Box */}
      <Modal
        title={null}
        open={showUploadModal}
        onCancel={() => setShowUploadModal(false)}
        footer={null}
        width={500}
        className="custom-premium-modal rounded-3xl overflow-hidden p-0 border border-slate-100 shadow-2xl"
        destroyOnClose
        centered
      >
        {/* Banner header of Modal */}
        <div className="bg-gradient-to-r from-[#ea580c] to-amber-500 px-6 py-5 text-white flex items-center gap-4 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            <FileAddOutlined style={{ fontSize: 22 }} />
          </div>
          <div>
            <h3 className="text-base font-black text-white leading-none">Tải lên tài liệu học trình</h3>
            <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider mt-1.5">Nạp cơ sở dữ liệu học tập thông minh</p>
          </div>
        </div>

        <div className="p-6 bg-[#fcfdff]">
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
            className="!rounded-2xl !border-dashed !border-2 !border-orange-200 hover:!border-[#ea580c]/60 !bg-white hover:!bg-[#fff7ed]/35 mb-6 transition-all duration-300 py-6"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: '#ea580c', fontSize: 38 }} className="animate-pulse" />
            </p>
            <p className="text-xs font-black text-[#0b1c30] mt-3">Kéo & thả tệp tin học tập vào đây</p>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">
              Hoặc <span className="text-[#ea580c] font-black underline hover:text-[#c2410c]">Bấm chọn từ thiết bị</span>
            </p>
            <p className="text-[9px] text-slate-400/80 mt-2 font-bold uppercase tracking-wide bg-slate-50 border border-slate-100 rounded-full px-3 py-0.5 inline-block">
              Hỗ trợ PDF, DOCX, XLSX, hình ảnh
            </p>
          </Dragger>

          <Form form={form} layout="vertical" onFinish={handleUploadSubmit} initialValues={{ type: 'pdf', size: '1.5 MB' }}>
            <Form.Item
              label={<span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Tên tệp tài liệu</span>}
              name="name"
              rules={[{ required: true, message: 'Nhập tên tệp tài liệu!' }]}
            >
              <Input placeholder="Giao_Trinh_Giai_Tich.pdf" className="rounded-xl font-semibold border-slate-200 hover:border-orange-400 focus:border-orange-500" />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item label={<span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Phân loại định dạng</span>} name="type">
                <Select
                  className="rounded-xl select-orange-accent"
                  popupClassName="rounded-xl"
                  options={[
                    { value: 'pdf', label: 'Tài liệu PDF' },
                    { value: 'docx', label: 'Văn bản Word' },
                    { value: 'xlsx', label: 'Bảng tính Excel' },
                    { value: 'image', label: 'Hình ảnh' },
                    { value: 'video', label: 'Video bài giảng' },
                    { value: 'other', label: 'Loại khác' },
                  ]}
                />
              </Form.Item>
              <Form.Item label={<span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Dung lượng tệp</span>} name="size">
                <Input placeholder="2.8 MB" className="rounded-xl border-slate-200 hover:border-orange-400 focus:border-orange-500 font-semibold" />
              </Form.Item>
            </div>

            <Form.Item label={<span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Nội dung trích dẫn (để Trợ lý AI đọc hiểu)</span>} name="content">
              <TextArea rows={3} placeholder="Điền hoặc dán nội dung chính cốt lõi của bài học tại đây..." className="rounded-xl font-semibold border-slate-200 hover:border-orange-400 focus:border-orange-500 text-xs" />
            </Form.Item>

            <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
              <Button onClick={() => setShowUploadModal(false)} className="rounded-xl font-bold text-xs h-9 cursor-pointer">
                Hủy thao tác
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="rounded-xl font-bold text-xs h-9 bg-gradient-to-r from-[#ea580c] to-amber-500 hover:from-[#c2410c] hover:to-orange-500 border-none shadow-md shadow-orange-500/10 cursor-pointer"
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
