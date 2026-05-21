/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Card, Form, Input, Button, Avatar, Tag, Progress, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  BookOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
  EnvironmentOutlined,
  SaveOutlined,
  IdcardOutlined,
  BarcodeOutlined,
} from '@ant-design/icons';

export default function ProfileScreen({ currentUser, documentsCount, storagePercentage }) {
  const [profileData, setProfileData] = useState({
    fullName: 'Alex Nguyen',
    email: currentUser || 'vuongbaovipvip@gmail.com',
    studentId: 'B21DCCN045',
    school: 'PTIT - Học viện Công nghệ Bưu chính Viễn thông',
    major: 'Khoa học Máy tính & Trí tuệ Nhân tạo',
  });

  const handleSave = (values) => {
    setProfileData((prev) => ({
      ...prev,
      ...values,
    }));
    message.success('Cập nhật thông tin hồ sơ thành công!');
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-screen text-left">
      <main className="flex-1 p-6 md:p-8 flex flex-col min-h-screen text-left select-none animate-slide-up">
        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-black text-[#0b1c30]">Cài đặt hệ thống</h2>
          <p className="text-xs text-[#5d5f5f] mt-0.5 font-semibold">Quản lý tài khoản cá nhân và hạn mức đồng bộ dữ liệu học trình</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card left: Avatar & Profile Mockup */}
          <div className="lg:col-span-4 space-y-6">
            {/* Futuristic PTIT Glassmorphic Student Card */}
            <Card className="rounded-[2.5rem] border border-slate-200/40 p-1 soft-shadow text-center overflow-hidden relative bg-white">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-tr from-[#ea580c] to-amber-500 rounded-b-[2rem] shadow-inner" />
              
              {/* Fake Hologram Chip */}
              <div className="absolute top-6 left-6 w-10 h-7 bg-amber-200/45 rounded-lg border border-amber-300/30 flex items-center justify-center backdrop-blur-sm">
                <div className="w-5 h-3.5 border border-amber-500/20 rounded-sm" />
              </div>

              {/* Holographic PTIT badge */}
              <div className="absolute top-6 right-6 px-2.5 py-1 bg-white/20 border border-white/25 rounded-full text-[9px] font-black text-white tracking-wider uppercase backdrop-blur-md">
                PTIT PRO
              </div>

              <div className="relative pt-16 flex flex-col items-center">
                <Avatar
                  size={100}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBow5mVfiNdaRBNOhUCDdCECelWMAJJIH-qphguPGLIXAfufQTeX5TZ1eZPJ2RfSdkXaqpdbdRwUwLhYiIolmk3c-psChGFWbL2n9oQPwS08-ynfA4bX-5j8Sgxl14-8lsQ9I6NnQy-uqdllZ9XeAPJTOidzr-LY7Xpd1_50olXILb8G_q9AznJwl2LlMupMfzTJViLVuvF-kYTH8HYBj56IAbsBVfAUq8LFA6TipGCkhC8NWRgYYa1dTJuQEBM2wBc6vdwKHvjv3o"
                  className="border-4 border-white shadow-xl rounded-3xl group-hover:scale-105 transition-all duration-300"
                  shape="square"
                />
                <h3 className="font-black text-[#0b1c30] text-lg mt-4.5 tracking-tight">{profileData.fullName}</h3>
                <Tag color="orange" className="font-black text-[9px] uppercase rounded-full mt-1.5 px-3.5 py-0.5 border-none shadow-sm">
                  Pro Student
                </Tag>
                <p className="text-xs text-slate-400 font-extrabold mt-2 flex items-center gap-1">
                  <EnvironmentOutlined className="text-[#ea580c]" /> PTIT E-Learning
                </p>
              </div>

              {/* Stats detail */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-5 pb-2 border-t border-slate-100/80 text-left px-4">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mã sinh viên</p>
                  <p className="text-xs font-black text-[#0b1c30] mt-0.5">{profileData.studentId}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Chuyên ngành</p>
                  <p className="text-xs font-black text-[#0b1c30] mt-0.5 truncate">{profileData.major.split(' & ')[0]}</p>
                </div>
              </div>

              {/* Simulation Barcode */}
              <div className="mx-4 mb-4 mt-3 pt-3 border-t border-dashed border-slate-100 flex flex-col items-center justify-center opacity-85">
                <BarcodeOutlined style={{ fontSize: 42 }} className="text-slate-700" />
                <span className="text-[8px] font-black text-slate-400 tracking-[0.3em] uppercase mt-0.5">PTIT-B21DCCN045</span>
              </div>
            </Card>

            {/* Storage Resource limits */}
            <Card className="rounded-[2.5rem] border border-slate-200/40 p-5 soft-shadow text-left bg-white">
              <h4 className="font-black text-sm text-[#0b1c30] mb-4 flex items-center gap-2">
                <SafetyCertificateOutlined className="text-[#ea580c]" /> Hạn mức tài nguyên học phần
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2">
                    <span>Bộ nhớ đám mây học tập</span>
                    <span className="text-[#ea580c] font-black">{storagePercentage.toFixed(0)}%</span>
                  </div>
                  <Progress percent={Math.round(storagePercentage)} showInfo={false} strokeColor="#ea580c" trailColor="rgba(0,0,0,0.04)" />
                  <p className="text-[10px] text-slate-400 font-bold mt-1.5 leading-relaxed">
                    {(documentsCount * 2.8).toFixed(1)} MB đã đồng bộ trên 50 MB tối đa
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100/80 flex justify-between items-center text-xs font-extrabold text-slate-500">
                  <span>Tổng số tài liệu lưu trữ:</span>
                  <span className="text-[#0b1c30] font-black text-sm bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-0.5">{documentsCount} tệp</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Form right: Edit Info */}
          <div className="lg:col-span-8">
            <Card className="rounded-[2.5rem] border border-slate-200/40 p-6 soft-shadow text-left bg-white">
              <h4 className="font-black text-sm text-[#0b1c30] mb-6 flex items-center gap-2">
                <SettingOutlined className="text-[#ea580c]" /> Thông tin lý lịch sinh viên
              </h4>

              <Form
                layout="vertical"
                onFinish={handleSave}
                initialValues={profileData}
                size="large"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Form.Item
                    label={<span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Họ và Tên học viên</span>}
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên sinh viên!' }]}
                  >
                    <Input prefix={<UserOutlined className="text-slate-400 mr-1.5" />} className="rounded-2xl border-slate-200 hover:border-orange-400 focus:border-orange-500 font-semibold" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Địa chỉ Email</span>}
                    name="email"
                  >
                    <Input prefix={<MailOutlined className="text-slate-400 mr-1.5" />} disabled className="rounded-2xl bg-slate-50 border-slate-200 font-semibold text-slate-400" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Form.Item
                    label={<span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Mã số sinh viên (ID)</span>}
                    name="studentId"
                    rules={[{ required: true, message: 'Nhập mã sinh viên!' }]}
                  >
                    <Input prefix={<IdcardOutlined className="text-slate-400 mr-1.5" />} className="rounded-2xl border-slate-200 hover:border-orange-400 focus:border-orange-500 font-semibold" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Chuyên ngành nghiên cứu</span>}
                    name="major"
                    rules={[{ required: true, message: 'Nhập ngành nghiên cứu!' }]}
                  >
                    <Input prefix={<BookOutlined className="text-slate-400 mr-1.5" />} className="rounded-2xl border-slate-200 hover:border-orange-400 focus:border-orange-500 font-semibold" />
                  </Form.Item>
                </div>

                <Form.Item
                  label={<span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Học viện / Trường đại học đào tạo</span>}
                  name="school"
                  rules={[{ required: true, message: 'Nhập trường đại học đào tạo!' }]}
                >
                  <Input className="rounded-2xl border-slate-200 hover:border-orange-400 focus:border-orange-500 font-semibold" />
                </Form.Item>

                <div className="flex justify-end pt-5 border-t border-slate-100">
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    className="rounded-xl font-bold text-xs h-10 px-6 bg-gradient-to-r from-[#ea580c] to-amber-500 hover:from-[#c2410c] hover:to-orange-500 border-none shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    Cập nhật hồ sơ sinh viên
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
