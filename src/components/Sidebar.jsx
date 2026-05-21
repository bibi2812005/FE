import { Menu, Progress, Avatar, Tooltip } from 'antd';
import {
  BookOutlined,
  FolderOutlined,
  TeamOutlined,
  RobotOutlined,
  SettingOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

/**
 * Main sidebar navigation for authenticated views.
 */
export default function Sidebar({
  currentView,
  onNavigate,
  onLogout,
  currentUser,
  storagePercentage,
  documentsCount,
  deletedDocsCount = 0,
}) {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <FolderOutlined />,
      label: 'Trang chủ',
    },
    {
      key: 'community',
      icon: <TeamOutlined />,
      label: 'Nhóm học tập',
    },
    {
      key: 'ai',
      icon: <RobotOutlined />,
      label: 'Trợ lý AI',
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#ea580c]/10 flex flex-col p-5 fixed h-full left-0 top-0 z-40 select-none">
      {/* Brand */}
      <div
        className="flex items-center gap-2.5 px-1 py-4 mb-6 cursor-pointer group"
        onClick={() => onNavigate('landing')}
      >
        <div className="w-9 h-9 bg-[#ea580c] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#ea580c]/20 group-hover:scale-105 transition-all">
          <BookOutlined style={{ fontSize: 18 }} />
        </div>
        <div>
          <span className="font-extrabold text-[#0b1c30] text-base tracking-tight block">
            AI Study Hub
          </span>
          <span className="text-[9px] font-black text-[#ea580c] bg-[#fff7ed] border border-[#ffedd5] px-2 py-0.5 rounded-full inline-block mt-0.5">
            Cổng Học Tập Số
          </span>
        </div>
      </div>

      {/* Navigation */}
      <Menu
        mode="inline"
        selectedKeys={[currentView]}
        onClick={({ key }) => onNavigate(key)}
        items={menuItems}
        className="flex-1 border-none !bg-transparent"
        style={{ borderInlineEnd: 'none' }}
      />

      {/* Bottom section */}
      <div className="mt-auto space-y-4 pt-4 border-t border-slate-100">
        {/* Storage */}
        <div className="bg-[#fff7ed] rounded-2xl p-4 border border-[#ffedd5]">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-extrabold text-slate-500 tracking-widest uppercase">
              Kho dữ liệu
            </span>
            <span className="text-[10px] font-extrabold text-[#ea580c] tracking-widest uppercase">
              {storagePercentage.toFixed(0)}%
            </span>
          </div>
          <Progress
            percent={storagePercentage}
            showInfo={false}
            strokeColor="#ea580c"
            trailColor="rgba(0,0,0,0.05)"
            size="small"
          />
          <p className="text-[10px] font-semibold text-slate-500 mt-1.5">
            {(documentsCount * 2.8).toFixed(1)} MB của 50 MB
          </p>
        </div>

        {/* Quick actions */}
        <div className="space-y-0.5">
          <Tooltip title="Hồ sơ & Cài đặt hệ thống" placement="right">
            <button
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all w-full text-left cursor-pointer text-xs font-semibold ${currentView === 'profile' ? 'bg-[#fff7ed] text-[#ea580c]' : 'text-slate-500 hover:bg-[#fff7ed] hover:text-[#ea580c]'}`}
            >
              <SettingOutlined /> Cài đặt hệ thống
            </button>
          </Tooltip>
          <Tooltip title="Thùng rác tài liệu đã xóa" placement="right">
            <button
              onClick={() => onNavigate('trash')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all w-full text-left cursor-pointer text-xs font-semibold ${currentView === 'trash' ? 'bg-[#fff7ed] text-[#ea580c]' : 'text-slate-500 hover:bg-[#fff7ed] hover:text-[#ea580c]'}`}
            >
              <DeleteOutlined /> {deletedDocsCount > 0 ? `Thùng rác (${deletedDocsCount})` : 'Thùng rác trống'}
            </button>
          </Tooltip>
          <button
            onClick={onLogout}
            className="flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all w-full text-left cursor-pointer text-xs font-bold"
          >
            <LogoutOutlined /> Đăng xuất ({currentUser?.split('@')[0] || 'guest'})
          </button>
        </div>
      </div>
    </aside>
  );
}
