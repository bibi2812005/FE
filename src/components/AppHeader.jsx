import { Input, Badge, Avatar } from 'antd';
import { GlobalOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';

/**
 * Shared header toolbar for Dashboard and Community pages.
 */
export default function AppHeader({ searchTerm, onSearchChange, children }) {
  return (
    <header className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-white/45 backdrop-blur-md p-4 rounded-2xl border border-white/50">
      <div className="relative w-full max-w-md">
        <Input
          placeholder="Tìm kiếm tài liệu học tập..."
          prefix={<SearchOutlined className="text-slate-400" />}
          allowClear
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-xl"
          size="large"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 bg-white rounded-xl shadow-sm text-[#5d5f5f] hover:text-[#ea580c] transition-all cursor-pointer">
          <GlobalOutlined style={{ fontSize: 16 }} />
        </button>
        <Badge dot offset={[-2, 2]}>
          <button className="p-2 bg-white rounded-xl shadow-sm text-[#5d5f5f] hover:text-[#ea580c] transition-all cursor-pointer">
            <BellOutlined style={{ fontSize: 16 }} />
          </button>
        </Badge>

        <div className="h-6 w-[1px] bg-slate-200" />

        {children}

        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-extrabold text-[#0b1c30]">Alex Nguyen</p>
            <span className="text-[10px] font-bold text-[#ea580c] bg-[#fff7ed] px-2 py-0.5 rounded-full">
              Pro Student
            </span>
          </div>
          <Avatar
            size={40}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBow5mVfiNdaRBNOhUCDdCECelWMAJJIH-qphguPGLIXAfufQTeX5TZ1eZPJ2RfSdkXaqpdbdRwUwLhYiIolmk3c-psChGFWbL2n9oQPwS08-ynfA4bX-5j8Sgxl14-8lsQ9I6NnQy-uqdllZ9XeAPJTOidzr-LY7Xpd1_50olXILb8G_q9AznJwl2LlMupMfzTJViLVuvF-kYTH8HYBj56IAbsBVfAUq8LFA6TipGCkhC8NWRgYYa1dTJuQEBM2wBc6vdwKHvjv3o"
            className="border border-[#ea580c]/10 rounded-xl"
            shape="square"
          />
        </div>
      </div>
    </header>
  );
}
