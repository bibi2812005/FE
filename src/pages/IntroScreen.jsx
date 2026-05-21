/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Typography } from 'antd';
import {
  BookOutlined,
  SafetyCertificateOutlined,
  RobotOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ArrowRightOutlined,
  StarOutlined,
  ReadOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function IntroScreen({ onNavigate }) {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] min-h-screen flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#e5eeff] flex justify-between items-center px-6 md:px-12 z-50">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('landing')}
        >
          <div className="w-8 h-8 bg-[#ea580c] rounded-lg flex items-center justify-center">
            <ReadOutlined style={{ color: '#fff', fontSize: 16 }} />
          </div>
          <span className="text-lg font-bold text-[#ea580c]">AI Study Hub</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <button onClick={() => onNavigate('landing')} className="text-[#ea580c] hover:text-[#c2410c] transition-all">Trang chủ</button>
          <a href="#features-section" className="text-[#5d5f5f] hover:text-[#ea580c] transition-all">Tính năng</a>
          <button onClick={() => onNavigate('login')} className="text-[#5d5f5f] hover:text-[#ea580c] transition-all">Tài liệu</button>
          <button onClick={() => onNavigate('login')} className="text-[#5d5f5f] hover:text-[#ea580c] transition-all">Cộng đồng</button>
          <button onClick={() => onNavigate('login')} className="text-[#5d5f5f] hover:text-[#ea580c] transition-all">Trợ lý AI</button>
        </div>

        <div className="flex items-center gap-3">
          <Button type="text" onClick={() => onNavigate('login')} className="font-bold text-xs text-slate-600">
            Đăng nhập
          </Button>
          <Button type="primary" onClick={() => onNavigate('register')} className="font-bold text-xs rounded-xl h-9">
            Đăng ký ngay
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[500px] lg:min-h-[640px] flex items-center overflow-hidden py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center">
            <div className="z-10 text-left animate-slide-up">
              <span className="bg-[#eff4ff] border border-[#ea580c]/20 text-[#ea580c] font-semibold text-xs px-3.5 py-1.5 rounded-full mb-6 inline-block">
                🚀 Đón đầu công nghệ AI trong giáo dục
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0b1c30] mb-6 leading-[1.15]">
                Học tập thông minh hơn với{' '}
                <span className="text-[#ea580c] block mt-1">Trí tuệ nhân tạo</span>
              </h1>
              <p className="text-base lg:text-lg text-[#5d5f5f] mb-10 max-w-lg leading-relaxed">
                Nền tảng quản lý tài liệu học tập tập trung kết hợp với trợ lý AI mạnh mẽ. Giải pháp tối ưu giúp bạn lưu trữ, tra cứu và tương tác với kiến thức hiệu quả nhất.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  onClick={() => onNavigate('login')}
                  className="h-12 px-8 font-bold text-sm rounded-xl"
                >
                  Bắt đầu ngay
                </Button>
                <Button
                  size="large"
                  onClick={() => onNavigate('login')}
                  className="h-12 px-8 font-bold text-sm rounded-xl"
                >
                  Đăng nhập tài khoản
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center animate-fade-in">
              <div className="relative z-10 rounded-2xl overflow-hidden soft-shadow border border-[#fed7aa]/30">
                <img
                  alt="AI Study Hub Interface"
                  className="w-full max-w-[520px] h-auto object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZmQdpg3ou3skcfkTd1JzmmSpT_Ev-1YrvD--VCLMGURFO_Al1sY0A4IdwVUrJTtAgJcHEC_P6qXtocKaGmFjAJiGYR_wBe9-uMi0YEMWiL7krzHpFmwKuX8O0HYRJ2Yr5z8SzfvoUVEXR-DIhGYrkqfFu7Fe60KtJCJKwwYH6ox7Sm4Vuw0Q4E5AVdnp1Xno2Hyb2IxZGirfhI-bMUIX5x31l-aOxKC6ysadCFWEmTEi0CCTlhA9EVzx-Sm0ngQLDjQtTPrz7K5s"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#ea580c]/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#0284c7]/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </section>

        {/* Problem vs Solution Section */}
        <section className="py-24 bg-[#eff4ff] border-y border-[#dce9ff]/30">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#0b1c30] mb-4">Bạn đang gặp khó khăn khi quản lý tài liệu?</h2>
              <div className="w-16 h-1 bg-[#ea580c] mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Problem */}
              <div className="bg-white p-8 md:p-10 rounded-3xl soft-shadow border border-[#fed7aa]/20 flex flex-col justify-between animate-slide-up">
                <div>
                  <div className="flex items-center gap-3 mb-8 text-[#ba1a1a]">
                    <CloseCircleOutlined style={{ fontSize: 28 }} />
                    <h3 className="text-xl font-bold text-[#0b1c30]">Vấn đề hiện tại của sinh viên</h3>
                  </div>
                  <ul className="space-y-6">
                    {[
                      'Tài liệu rải rác trên Google Drive, Messenger, Zalo và ổ cứng máy tính gây thất lạc.',
                      'Mất quá nhiều thời gian để mò tìm lại một file PDF, giáo trình hoặc bài giảng cũ.',
                      'Khó khăn khi muốn tra cứu nhanh, đọc tóm tắt nội dung bên trong hàng trăm trang tài liệu dày đặc.',
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#ba1a1a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[#ba1a1a] font-bold text-sm">✕</span>
                        </div>
                        <p className="text-sm font-medium text-[#5d5f5f]">{text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 border-t border-slate-100 pt-4 text-xs font-medium text-[#5d5f5f] text-right">
                  Cơ sở dữ liệu rời rạc, thiếu hiệu quả
                </div>
              </div>

              {/* Solution */}
              <div className="bg-[#ea580c] p-8 md:p-10 rounded-3xl soft-shadow text-white flex flex-col justify-between animate-slide-up">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <CheckCircleOutlined style={{ fontSize: 28 }} />
                    <h3 className="text-xl font-bold">Giải pháp tuyệt hảo từ AI Study Hub</h3>
                  </div>
                  <ul className="space-y-6">
                    {[
                      'Mọi tài liệu được lưu trữ tập trung tại một nơi duy nhất và tự động phân loại thông minh theo môn học.',
                      'Hệ thống tìm kiếm toàn diện theo từ khóa, chủ đề, tự động gắn thẻ lưu trữ tiện lợi.',
                      'Trợ lý AI đọc và hiểu tài liệu cùng bạn, hỗ trợ tóm tắt ý chính và trả lời mọi thắc mắc ngay lập tức.',
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-bold text-sm">✓</span>
                        </div>
                        <p className="text-sm font-medium text-white/90">{text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 border-t border-white/20 pt-4 text-xs font-semibold text-white/80 text-right">
                  Hệ tri thức kết hợp trí tuệ nhân tạo
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features-section" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#0b1c30] mb-3">Tính năng đột phá</h2>
              <p className="text-[#5d5f5f] max-w-2xl mx-auto">Chúng tôi cung cấp các công cụ tiên tiến nhất để tối ưu hóa lộ trình học tập của bạn.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <BookOutlined style={{ fontSize: 24 }} />, title: 'Quản lý tập trung', desc: 'Không còn lo lắng về việc thất lạc tài liệu quan trọng giữa các nền tảng khác nhau.', link: 'Đến thư viện', view: 'dashboard' },
                { icon: <SafetyCertificateOutlined style={{ fontSize: 24 }} />, title: 'Lưu trữ đám mây', desc: 'Truy cập mọi lúc, mọi nơi từ mọi thiết bị với dữ liệu đám mây bảo mật tối đa.', link: 'Mở kho lưu trữ', view: 'dashboard' },
                { icon: <RobotOutlined style={{ fontSize: 24 }} />, title: 'Trợ lý AI thông minh', desc: 'Hỏi đáp trực tiếp trên nội dung tài liệu của bạn để đúc kết kiến thức chỉ trong vài giây.', link: 'Nhắn tin với AI', view: 'ai' },
                { icon: <TeamOutlined style={{ fontSize: 24 }} />, title: 'Chia sẻ cộng đồng', desc: 'Tạo cộng đồng học tập, cùng nhau chia sẻ tài liệu và thảo luận bài vở quý báu.', link: 'Vào nhóm học tập', view: 'community' },
              ].map((f, i) => (
                <div
                  key={i}
                  onClick={() => onNavigate('login')}
                  className="p-6 bg-[#eff4ff] border border-[#e5eeff] hover:border-[#ea580c]/40 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 soft-shadow text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white transition-all">
                      {f.icon}
                    </div>
                    <h4 className="text-lg font-bold text-[#0b1c30] mb-2 group-hover:text-[#ea580c] transition-all">{f.title}</h4>
                    <p className="text-sm text-[#5d5f5f] leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="mt-6 text-xs font-bold text-[#ea580c] flex items-center gap-1">
                    {f.link} <ArrowRightOutlined style={{ fontSize: 12 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mockup Section */}
        <section className="py-24 bg-[#eff4ff]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="bg-[#213145] rounded-[40px] p-8 md:p-16 overflow-hidden relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-white text-left">
                  <h2 className="text-3xl font-extrabold mb-6 leading-tight">Trải nghiệm không gian học tập 4.0</h2>
                  <p className="text-[#cbdbf5] text-base mb-8 opacity-90 leading-relaxed">
                    Giao diện tối giản, trực quan giúp bạn tập trung hoàn toàn vào việc nghiên cứu học tập. Với AI Study Hub, việc tóm tắt tài liệu dày hàng trăm trang hay giải bài tập tự động được tối ưu nhất.
                  </p>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-lg bg-[#ea580c]/25 flex items-center justify-center text-[#fed7aa]">
                      <StarOutlined style={{ fontSize: 20 }} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">AI Assistant luôn sẵn sàng</p>
                      <p className="text-xs text-[#c6c6c7]">"Tóm tắt chương 3 của tài liệu này cho tôi"</p>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-center">
                  <img
                    alt="App Dashboard Preview"
                    className="rounded-2xl soft-shadow border border-white/20 transition-transform duration-500 hover:scale-[1.03] max-w-full h-auto"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYHprJsGsxP4ohVWj4HEUswuXobiK63T_lxy0mP1VZXfQqpae0ylaE3PZXXHeCfSro2UwEC51X6jfTgdMRYtkMamWBBI11DdFysWN2qFcDOEm22N-z0QpT1ZmTgOm7L2xfZt4CAh0u26huiFcaqRgSD8IZkpyr4qhCk4twk88qQrv8puK-i0g5gZS2bhWJ73x6m4TPB9JFPw3LuOjPnNHPiSNTQGyrWhMnINoX9Vywxu7dr1UDXYhVG7rWgkh1uYsJbCrsp65naVE"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 border-y border-[#dce9ff]/40 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                { num: '50k+', title: 'Sinh viên tin dùng', sub: 'Đến từ các trường đại học hàng đầu' },
                { num: '1M+', title: 'Tài liệu lưu trữ', sub: 'Được số hóa phân tích và bảo mật' },
                { num: '98%', title: 'Hài lòng', sub: 'Về độ chính xác và tốc độ phản hồi của AI' },
              ].map((s, i) => (
                <div key={i} className={`${i < 2 ? 'border-b md:border-b-0 md:border-r border-[#e5eeff]' : ''} pb-8 md:pb-0`}>
                  <p className="text-5xl font-extrabold text-[#ea580c] mb-2">{s.num}</p>
                  <p className="text-lg font-bold text-[#0b1c30]">{s.title}</p>
                  <p className="text-xs text-[#5d5f5f] mt-1">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-[#eff4ff]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12 text-left">
            <div className="col-span-2 md:col-span-1">
              <span className="text-lg font-bold text-[#ea580c] block mb-6">AI Study Hub</span>
              <p className="text-xs text-[#5d5f5f] leading-relaxed">
                Nền tảng tiên phong trong việc hỗ trợ quản trị tri thức hiệu suất cao cho cộng đồng học thuật Việt Nam.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-[#0b1c30] text-sm mb-4">Sản phẩm</h5>
              <ul className="space-y-3.5 text-xs text-[#5d5f5f]">
                <li><button onClick={() => onNavigate('login')} className="hover:text-[#ea580c] transition-all">Quản lý tài liệu</button></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-[#ea580c] transition-all">Trợ lý học tập AI</button></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-[#ea580c] transition-all">Nhóm học tập</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-[#0b1c30] text-sm mb-4">Cộng đồng</h5>
              <ul className="space-y-3.5 text-xs text-[#5d5f5f]">
                <li><button onClick={() => onNavigate('login')} className="hover:text-[#ea580c] transition-all">Nhóm Machine Learning</button></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-[#ea580c] transition-all">Nhóm Khoa học dữ liệu</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-[#0b1c30] text-sm mb-4">Liên hệ hỗ trợ</h5>
              <ul className="space-y-3.5 text-xs text-[#5d5f5f]">
                <li>Trung tâm trợ giúp</li>
                <li><span className="font-medium text-[#ea580c]">vuongbaovipvip@gmail.com</span></li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#e5eeff] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#5d5f5f]">
            <p>© 2026 AI Study Hub. Developed with ❤️ for Vietnam Students.</p>
            <div className="flex gap-6">
              <span className="hover:underline cursor-pointer">Điều khoản</span>
              <span className="hover:underline cursor-pointer">Bảo mật</span>
              <span className="hover:underline cursor-pointer">Sơ đồ trang</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
