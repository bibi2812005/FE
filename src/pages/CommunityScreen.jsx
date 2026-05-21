/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Button, Card, Segmented, Modal, Form, Input, Select, Tag, Statistic, message } from 'antd';
import {
  TeamOutlined,
  SearchOutlined,
  PlusOutlined,
  CheckOutlined,
  FolderOpenOutlined,
  StarOutlined,
  NumberOutlined,
  ArrowRightOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import AppHeader from '../components/AppHeader.jsx';

const { TextArea } = Input;

export default function CommunityScreen({ groups, onToggleJoin, onAddGroup, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form] = Form.useForm();

  const categories = ['All', 'Computer Science', 'Humanities', 'Economics', 'Natural Sciences'];
  const categoryLabels = {
    All: 'Tất cả học phần',
    'Computer Science': 'Khoa học MT',
    Humanities: 'Nhân văn',
    Economics: 'Kinh tế',
    'Natural Sciences': 'Tự nhiên',
  };

  const filteredGroups = groups.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateGroup = (values) => {
    const sampleImages = {
      'Computer Science': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL__MaLnrRAoDtqpn7wHLeaS8IImZk1gvQ0fjuS4DVj1-9iBZwranDAecMvtIzjrou36PWOLLAhSBnK75kmayhTT4gLBS4kD_wwRxTP-6mU0xzjVuprU34I_Oukn217eqsIPN22rQ6s2ITGl9YEtUMfRtpGT1dQqohK2hjUsGLjEe88uraah_rDHbrgZPHir_4W-B3Vj2nRG2wm7oPDyeiTmDpvbjaHrIaaEi8G1-qYlZtWzAKDrGxdrIpze8XDFL5jXrJsx5_kwE',
      Humanities: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzuHBfyEulLDS7NLAlBTQ9ZA581bUaL5q3BbCF5DO-0k1tjHMxj_117W-uFLEiixZeakU2ofejHCdxwnZxRCFP0cJKNHMQjwJvHmMX4JcEqpBOnYEbbWiFLRY2zg2urcYF7O3eOPSVX3eWtcx_eqJS1OSQ49IsPcHEMbdnjp0iGVjj3-ZXTZTERlKX2zK2IgUbXSpRIrGrXhxZRTHZaJAJBNY1_OR0WCzKCRQZ7Uu1f2vdluyMXCqCdt1Hcezg1XgkRQTSYQLkn00',
      Economics: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6krzE3AtQi2sFzAnMWe_v_gJkvOoAufK5AkQ69KjZI93tVt2LtsC93gUnckTVBraoUOYKPDKW9YbEGl9LNFBhvXipCNRpTQYNKMwT0DOO8xR_VsG6WrEaLGq06eps26JTFqDaAOOFQjVbnuSJJa7UpUla635EHAKt8kxSOQl2xnbZktmSSevaK_eTWN1vbwhnWXlfhr84X31G0mL8sFryb_xi3vO8KMzRWuYArStJV8sEEv8TnNYZHrB_mwPr62QpuA2eFiiLU-Y',
    };

    onAddGroup({
      id: 'group_' + Date.now(),
      name: values.name,
      category: values.category,
      description: values.description || 'Không gian giao lưu học thuật, chia sẻ giáo trình.',
      image: sampleImages[values.category] || sampleImages['Computer Science'],
      members: '1 thành viên',
      filesCount: 1,
      isJoined: true,
    });

    form.resetFields();
    setShowCreateModal(false);
    message.success(`Đã tạo nhóm "${values.name}" thành công!`);
  };

  const featuredGroup = groups.find((g) => g.isTopRated) || groups[0];

  const trendingTopics = [
    { emoji: '🧠', name: 'Cognitive Science Hub', desc: 'Nghiên cứu quá trình tư duy, nhận thức kết hợp mạng neuron.', stats: '420 bài • 12 online' },
    { emoji: '📖', name: 'Literature & Philosophy', desc: 'Triết học cổ điển phương Tây, phân tích văn học so sánh.', stats: '210 bài • 5 online' },
    { emoji: '💻', name: 'Quantum Computing 101', desc: 'Xây dựng giải thuật cổng lượng tử qubit cơ bản.', stats: '105 bài • 9 online' },
  ];

  return (
    <div className="flex-1 w-full flex flex-col min-h-screen text-left">
      <main className="flex-1 p-6 md:p-8 flex flex-col min-h-screen text-left">
        <AppHeader searchTerm={searchTerm} onSearchChange={setSearchTerm}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowCreateModal(true)} className="rounded-xl font-bold text-xs">
            Tạo nhóm thảo luận
          </Button>
        </AppHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 cols */}
          <section className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-black text-[#0b1c30]">Khám phá cộng đồng</h2>
              <p className="text-xs text-[#5d5f5f] mt-0.5">Tham gia nhóm học tập để tải giáo trình chia sẻ chất lượng</p>
            </div>

            {/* Featured group */}
            {featuredGroup && (
              <div className="bg-white rounded-[2rem] border border-white soft-shadow overflow-hidden relative group">
                <div className="h-44 md:h-52 w-full relative">
                  <img alt={featuredGroup.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={featuredGroup.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Tag icon={<StarOutlined />} color="gold" className="font-black text-[10px] uppercase tracking-widest rounded-full border-0">
                      Nổi bật tuần
                    </Tag>
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <Tag color="orange" className="text-[10px] font-extrabold uppercase tracking-wider rounded-full">{featuredGroup.category}</Tag>
                      <h3 className="text-xl font-bold text-[#0b1c30] mt-2">{featuredGroup.name}</h3>
                    </div>
                    <Button
                      type={featuredGroup.isJoined ? 'default' : 'primary'}
                      icon={featuredGroup.isJoined ? <CheckOutlined /> : null}
                      onClick={() => onToggleJoin(featuredGroup.id)}
                      danger={featuredGroup.isJoined}
                      className="rounded-xl font-bold text-xs"
                    >
                      {featuredGroup.isJoined ? 'Đã gia nhập' : 'Gia nhập ngay'}
                    </Button>
                  </div>
                  <p className="text-xs text-[#5d5f5f] leading-relaxed font-semibold">{featuredGroup.description}</p>
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-6 text-[10px] font-bold text-[#5d5f5f]">
                    <span className="flex items-center gap-1.5 bg-slate-100 py-1.5 px-3 rounded-lg"><TeamOutlined className="text-[#ea580c]" /> {featuredGroup.members}</span>
                    <span className="flex items-center gap-1.5 bg-slate-100 py-1.5 px-3 rounded-lg"><FolderOpenOutlined className="text-[#ea580c]" /> {featuredGroup.filesCount} giáo trình</span>
                  </div>
                </div>
              </div>
            )}

            {/* Category filter */}
            <div className="border-b pb-4 border-slate-200">
              <Segmented
                options={categories.map((c) => ({ label: categoryLabels[c] || c, value: c }))}
                value={selectedCategory}
                onChange={setSelectedCategory}
                className="font-extrabold"
              />
            </div>

            {/* Group cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGroups.filter((g) => !g.isTopRated).map((g) => (
                <div key={g.id} className="bg-white rounded-3xl border border-slate-200/40 p-5 soft-shadow flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden text-left">
                  <div>
                    <div className="h-32 mb-4 rounded-2xl overflow-hidden relative">
                      <img alt={g.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={g.image} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Tag className="absolute bottom-3 left-3 text-[9px] font-extrabold text-white/90 bg-white/20 backdrop-blur-md rounded-md border border-white/10 uppercase">
                        {g.category}
                      </Tag>
                    </div>
                    <h4 className="font-extrabold text-sm text-[#0b1c30] group-hover:text-[#ea580c] transition-all mb-1">{g.name}</h4>
                    <p className="text-[11px] text-[#5d5f5f] font-semibold leading-relaxed line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100/30">{g.description}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between gap-4 mt-4">
                    <div className="text-[10px] text-[#5d5f5f]/60 font-semibold space-y-0.5">
                      <p className="flex items-center gap-1"><TeamOutlined /> {g.members}</p>
                      <p className="flex items-center gap-1"><FolderOpenOutlined /> {g.filesCount} tài liệu</p>
                    </div>
                    <Button
                      type={g.isJoined ? 'default' : 'primary'}
                      size="small"
                      icon={g.isJoined ? <CheckOutlined /> : null}
                      onClick={() => onToggleJoin(g.id)}
                      className="rounded-xl font-bold text-[11px]"
                    >
                      {g.isJoined ? 'Đang tham gia' : 'Tham gia'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right sidebar */}
          <section className="space-y-6">
            {/* Stats */}
            <Card className="rounded-3xl soft-shadow text-left" title={<span className="font-extrabold text-sm flex items-center gap-2"><StarOutlined style={{ color: '#f59e0b' }} /> Hoạt động hôm nay</span>}>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#5d5f5f]/70">Tổng tài liệu chia sẻ</span>
                  <span className="text-[#ea580c] font-bold">14,250 file</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#5d5f5f]/70">Số nhóm thảo luận</span>
                  <span className="text-[#ea580c] font-bold">128 nhóm</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#5d5f5f]/70">Thành viên trực tuyến</span>
                  <span className="text-green-600 font-bold">● 1,040 online</span>
                </div>
              </div>
            </Card>

            {/* Trending */}
            <Card className="rounded-3xl soft-shadow text-left" title={<span className="font-extrabold text-sm flex items-center gap-2"><NumberOutlined style={{ color: '#ea580c' }} /> Chủ đề hot nhất</span>}>
              <div className="space-y-4">
                {trendingTopics.map((t, i) => (
                  <div
                    key={i}
                    onClick={() => message.info(`Đang chuyển tới ${t.name}...`)}
                    className="p-3.5 rounded-2xl hover:bg-[#ea580c]/5 border border-transparent hover:border-[#fed7aa]/20 transition-all cursor-pointer group flex items-start gap-3"
                  >
                    <div className="w-9 h-9 bg-[#e5eeff] rounded-xl flex items-center justify-center font-bold text-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white transition-all text-sm shrink-0">
                      {t.emoji}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0b1c30]">{t.name}</h4>
                      <p className="text-[10px] text-[#5d5f5f] mt-0.5">{t.desc}</p>
                      <span className="text-[9px] font-extrabold text-[#ea580c] block mt-1">{t.stats}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Ambassador ad */}
            <div className="bg-[#ea580c] rounded-[2rem] p-6 text-white text-left overflow-hidden relative shadow-lg shadow-[#ea580c]/10">
              <div className="relative z-10 space-y-4">
                <ThunderboltOutlined style={{ fontSize: 32, opacity: 0.8 }} />
                <h4 className="font-extrabold text-base">Tuyển Đại sứ sinh viên Học tập thông minh!</h4>
                <p className="text-[10px] text-white/80 leading-relaxed font-semibold">
                  Trở thành người đại diện hỗ trợ chuyển đổi số AI Study Hub tại đại học của bạn và nhận đặc quyền Pro miễn phí trọn đời.
                </p>
                <Button
                  onClick={() => message.info('Đăng ký đại sứ tại vuongbaovipvip@gmail.com')}
                  className="bg-white hover:bg-slate-50 text-[#ea580c] font-black rounded-xl text-[11px] border-0"
                  icon={<ArrowRightOutlined />}
                >
                  Tìm hiểu chương trình
                </Button>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>
          </section>
        </div>
      </main>

      {/* Create Group Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ea580c]/10 flex items-center justify-center text-[#ea580c]">
              <TeamOutlined style={{ fontSize: 20 }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0b1c30]">Tạo nhóm học tập mới</h3>
              <p className="text-xs text-[#5d5f5f] mt-0.5 font-normal">Kết nối sinh viên cùng chí hướng chia sẻ bài học</p>
            </div>
          </div>
        }
        open={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        footer={null}
        width={480}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleCreateGroup} initialValues={{ category: 'Computer Science' }}>
          <Form.Item label={<span className="text-[10px] font-extrabold text-[#5d5f5f] uppercase tracking-wider">Tên chủ đề nhóm</span>} name="name" rules={[{ required: true, message: 'Nhập tên nhóm!' }]}>
            <Input placeholder="Ví dụ: Đại số tuyến tính thầy Cường" className="rounded-xl" />
          </Form.Item>
          <Form.Item label={<span className="text-[10px] font-extrabold text-[#5d5f5f] uppercase tracking-wider">Phân ngành cụ thể</span>} name="category">
            <Select
              options={[
                { value: 'Computer Science', label: 'Khoa học Máy tính & AI' },
                { value: 'Humanities', label: 'Khoa học Xã hội & Nhân văn' },
                { value: 'Economics', label: 'Kinh tế học' },
                { value: 'Natural Sciences', label: 'Khoa học Tự nhiên' },
              ]}
              className="rounded-xl"
            />
          </Form.Item>
          <Form.Item label={<span className="text-[10px] font-extrabold text-[#5d5f5f] uppercase tracking-wider">Mô tả ngắn gọn</span>} name="description">
            <TextArea rows={2} placeholder="Nơi giải đáp và nộp đề cương tóm tắt..." className="rounded-xl" />
          </Form.Item>
          <div className="flex gap-3 justify-end pt-2">
            <Button onClick={() => setShowCreateModal(false)} className="rounded-xl font-bold text-xs">Hủy bỏ</Button>
            <Button type="primary" htmlType="submit" className="rounded-xl font-bold text-xs">Tạo nhóm ngay</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
