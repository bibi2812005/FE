/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Table, Button, Tag, Card, Tooltip, message, Popconfirm, Empty } from 'antd';
import {
  UndoOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FolderOpenOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import FileIcon from '../components/FileIcon.jsx';
import { getFileTagColor, getFileTypeLabel } from '../utils/helpers.js';

export default function TrashScreen({ deletedDocs, onRestoreDoc, onPermanentlyDeleteDoc }) {
  const handleRestore = (doc) => {
    onRestoreDoc(doc);
    message.success(`Khôi phục tài liệu "${doc.name}" thành công!`);
  };

  const handlePermanentDelete = (docId) => {
    onPermanentlyDeleteDoc(docId);
    message.success('Tài liệu đã được xóa hoàn toàn khỏi cơ sở học trình.');
  };

  const columns = [
    {
      title: <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tên tài liệu đã xóa</span>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-3.5 py-1">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100/60 shadow-sm flex items-center justify-center shrink-0">
            <FileIcon type={record.type} />
          </div>
          <span className="font-extrabold text-[#0b1c30] text-xs hover:text-[#ea580c] transition-all duration-200">
            {text}
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Định dạng</span>,
      dataIndex: 'type',
      key: 'type',
      width: 130,
      render: (type) => (
        <Tag color={getFileTagColor(type)} className="font-black text-[9px] uppercase rounded-full px-2.5 py-0.5 border-none shadow-sm">
          {getFileTypeLabel(type)}
        </Tag>
      ),
    },
    {
      title: <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dung lượng</span>,
      dataIndex: 'size',
      key: 'size',
      width: 120,
      render: (size) => (
        <span className="text-xs font-extrabold text-[#5d5f5f]">{size}</span>
      ),
    },
    {
      title: <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right block">Thao tác xử lý</span>,
      key: 'actions',
      width: 260,
      align: 'right',
      render: (_, record) => (
        <div className="flex items-center justify-end gap-3.5">
          <Button
            type="primary"
            ghost
            size="small"
            icon={<UndoOutlined />}
            onClick={() => handleRestore(record)}
            className="font-extrabold text-[11px] rounded-xl hover:!border-[#ea580c] hover:!text-[#ea580c] h-8 px-4 cursor-pointer"
          >
            Khôi phục
          </Button>

          <Popconfirm
            title="Xóa vĩnh viễn"
            description="Lưu ý: Tệp này sẽ biến mất vĩnh viễn khỏi toàn bộ hệ thống của bạn."
            onConfirm={() => handlePermanentDelete(record.id)}
            okText="Đồng ý xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true, size: 'small', className: 'rounded-lg text-[10px] font-bold h-7 cursor-pointer' }}
            cancelButtonProps={{ size: 'small', className: 'rounded-lg text-[10px] font-semibold h-7 cursor-pointer' }}
            icon={<ExclamationCircleOutlined className="text-red-500" />}
          >
            <Tooltip title="Xóa vĩnh viễn tài liệu">
              <Button
                type="primary"
                danger
                size="small"
                icon={<DeleteOutlined />}
                className="font-extrabold text-[11px] rounded-xl h-8 px-3 cursor-pointer shadow-sm shadow-red-500/10"
              >
                Xóa vĩnh viễn
              </Button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 w-full flex flex-col min-h-screen text-left">
      <main className="flex-1 p-6 md:p-8 flex flex-col min-h-screen text-left select-none animate-slide-up">
        {/* Title bar */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#0b1c30]">Thùng rác tài nguyên</h2>
            <p className="text-xs text-[#5d5f5f] mt-0.5 font-semibold">
              Quản trị phục hồi các tệp đã xóa tạm thời hoặc dọn sạch tài nguyên lưu trữ của bạn
            </p>
          </div>
          {deletedDocs.length > 0 && (
            <Popconfirm
              title="Dọn sạch thùng rác"
              description="Hành động này sẽ xóa vĩnh viễn tất cả tệp tin trong thùng rác học tập."
              onConfirm={() => {
                deletedDocs.forEach((d) => onPermanentlyDeleteDoc(d.id));
                message.success('Đã làm trống thùng rác học tập!');
              }}
              okText="Làm trống ngay"
              cancelText="Hủy"
              okButtonProps={{ danger: true, className: 'cursor-pointer rounded-lg text-[10px] h-7 font-bold' }}
              cancelButtonProps={{ className: 'cursor-pointer rounded-lg text-[10px] h-7 font-semibold' }}
            >
              <Button
                type="primary"
                danger
                icon={<ClearOutlined />}
                className="rounded-xl font-bold text-xs h-9 shadow-md shadow-red-500/10 cursor-pointer"
              >
                Dọn sạch thùng rác
              </Button>
            </Popconfirm>
          )}
        </div>

        {/* Content table */}
        {deletedDocs.length > 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/40 p-3.5 shadow-sm overflow-hidden flex-1 animate-scale-up">
            <Table
              columns={columns}
              dataSource={deletedDocs}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Tổng số ${total} tài liệu chờ giải phóng`,
                className: 'px-4 font-semibold text-slate-400 text-xs',
              }}
              className="rounded-2xl custom-premium-table"
              size="middle"
            />
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200/40 p-12 soft-shadow flex flex-col items-center justify-center text-center animate-scale-up">
            <Empty
              image={<FolderOpenOutlined style={{ fontSize: 72, color: '#ffedd5' }} className="animate-pulse" />}
              description={
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-black text-[#0b1c30]">Thùng rác hiện đang trống!</p>
                  <p className="text-xs text-slate-400 font-semibold max-w-sm mx-auto leading-relaxed">
                    Khi bạn xóa tệp ở Trang chủ, chúng sẽ tạm thời lưu ở đây để khôi phục hoặc xóa hẳn bất kỳ lúc nào.
                  </p>
                </div>
              }
            />
          </div>
        )}
      </main>
    </div>
  );
}
