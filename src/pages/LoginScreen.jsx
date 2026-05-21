/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Alert, Divider, message } from 'antd';
import {
  LockOutlined,
  RobotOutlined,
  ArrowRightOutlined,
  StarOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

export default function LoginScreen({ onLoginSuccess, onNavigate, currentView }) {
  const [isRegister, setIsRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [form] = Form.useForm();

  // Handle direct navigation triggers
  useEffect(() => {
    if (currentView === 'register') {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
    setErrorMsg('');
    form.resetFields();
  }, [currentView, form]);

  const handleSubmit = (values) => {
    setErrorMsg('');
    if (isRegister) {
      if (values.password !== values.confirmPassword) {
        setErrorMsg('Mật khẩu nhập lại không trùng khớp.');
        return;
      }
      message.success('Đăng ký tài khoản thành công! Tự động đăng nhập...');
      onLoginSuccess(values.usernameOrEmail);
    } else {
      if (!values.usernameOrEmail) {
        setErrorMsg('Vui lòng điền email hoặc tên đăng nhập.');
        return;
      }
      if (!values.password || values.password.length < 6) {
        setErrorMsg('Mật khẩu phải chứa ít nhất 6 ký tự.');
        return;
      }
      message.success('Đăng nhập thành công!');
      onLoginSuccess(values.usernameOrEmail);
    }
  };

  const handleGoogleLogin = () => {
    message.success('Đăng nhập bằng Google Workspace thành công!');
    onLoginSuccess('vuongbaovipvip@gmail.com');
  };

  return (
    <div className="bg-[#f0f4ff] text-[#0b1c30] h-screen max-h-screen overflow-hidden flex flex-row font-sans w-full select-none relative">
      {/* Abstract Glowing Blurs on Left */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-300/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[40%] w-[35%] h-[35%] bg-blue-300/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Left: Interactive Form */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 py-4 lg:px-16 z-10 bg-white/70 backdrop-blur-3xl shadow-2xl relative max-h-screen overflow-y-auto border-r border-slate-100">
        <div className="w-full max-w-[390px] py-4 animate-slide-up">
          {/* Brand */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div
              className="flex items-center gap-3 mb-2.5 cursor-pointer group"
              onClick={() => onNavigate('landing')}
            >
              <div className="w-11 h-11 bg-gradient-to-tr from-[#ea580c] to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-all duration-300 text-white">
                <RobotOutlined style={{ fontSize: 22 }} />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-[#ea580c] to-amber-600 bg-clip-text text-transparent tracking-tight">
                  AI Study Hub
                </h1>
                <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase block mt-0.5">
                  Cổng Học Tập Thông Minh
                </span>
              </div>
            </div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-full px-3 py-1 mt-2 inline-block">
              {isRegister ? 'Đăng ký tài khoản học viên' : 'Hệ thống số hóa tri thức'}
            </p>
          </div>

          <div className="space-y-4">
            {errorMsg && (
              <Alert
                message={<span className="text-[11px] font-semibold">{errorMsg}</span>}
                type="error"
                showIcon
                closable
                onClose={() => setErrorMsg('')}
                className="rounded-2xl py-2 px-4 shadow-sm border border-red-100 animate-scale-up"
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ usernameOrEmail: 'vuongbaovipvip@gmail.com', password: '12345678', remember: true }}
              size="large"
              requiredMark={false}
            >
              <Form.Item
                label={<span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Email hoặc Tên đăng nhập</span>}
                name="usernameOrEmail"
                rules={[{ required: true, message: 'Vui lòng điền thông tin đăng nhập!' }]}
              >
                <Input
                  prefix={<UserOutlined className="text-slate-400 mr-1.5" />}
                  placeholder="name@university.edu.vn hoặc username"
                  className="rounded-2xl h-12 border-slate-200 hover:border-orange-400 focus:border-orange-500 font-semibold text-xs"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Mật khẩu</span>}
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-slate-400 mr-1.5" />}
                  placeholder="••••••••"
                  className="rounded-2xl h-12 border-slate-200 hover:border-orange-400 focus:border-orange-500 font-semibold text-xs"
                />
              </Form.Item>

              {isRegister && (
                <Form.Item
                  label={<span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Nhập lại mật khẩu</span>}
                  name="confirmPassword"
                  rules={[
                    { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu nhập lại chưa khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-slate-400 mr-1.5" />}
                    placeholder="••••••••"
                    className="rounded-2xl h-12 border-slate-200 hover:border-orange-400 focus:border-orange-500 font-semibold text-xs"
                  />
                </Form.Item>
              )}

              {!isRegister && (
                <div className="flex items-center justify-between mb-5">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-xs font-semibold text-slate-500 hover:text-orange-500">
                      Duy trì đăng nhập
                    </Checkbox>
                  </Form.Item>
                  <button
                    type="button"
                    onClick={() => message.info('Mã khôi phục đã được mô phỏng gửi đến email sinh viên.')}
                    className="text-[11px] font-black text-[#ea580c] hover:text-[#c2410c] hover:underline transition-all"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              )}

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  icon={<ArrowRightOutlined />}
                  className="h-12 rounded-2xl font-bold text-xs bg-gradient-to-r from-[#ea580c] to-amber-500 hover:from-[#c2410c] hover:to-orange-500 border-none transition-all duration-300 shadow-md shadow-orange-500/10 cursor-pointer"
                >
                  {isRegister ? 'Khởi tạo tài khoản' : 'Đăng nhập hệ thống'}
                </Button>
              </Form.Item>
            </Form>

            <Divider className="!text-[9px] !font-black !text-slate-400 !uppercase !tracking-widest !my-4">
              Hoặc tiếp tục với
            </Divider>

            <Button
              block
              onClick={handleGoogleLogin}
              className="h-12 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 hover:border-orange-300 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
              icon={
                <img
                  alt="Google"
                  className="w-4 h-4"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ztosA2sEnMYyfeWKapcnEE90FMguHV1cdJALRFNZsLwWQ0Qu-YsF44e9KcWt1ZUhHSp4lSicxbBRrkyzw59_W1KY6NbPWiS8q9aDny9j7zfR_8yZl8DVcchvRGowiDC5VwlZ41Glqh8Q29u4hX7a9wV3ouLCA0INRDuXDMb3xtIN4mzTK4l6SHcd9DDXy2t-Iy37zmFRaJP1tpkQGz33APZhgk8K6eKCz4ZnQASu-Vbot86pZyOibEQdBQLsN2hZDUi1Q4b47U4"
                />
              }
            >
              <span className="text-[11px] text-slate-600 font-extrabold">Google Workspace</span>
            </Button>

            <p className="text-xs font-bold text-slate-500 text-center pt-3">
              {isRegister ? 'Đã có tài khoản học tập?' : 'Chưa có tài khoản sinh viên?'}{' '}
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrorMsg('');
                  form.resetFields();
                }}
                className="text-[#ea580c] font-black hover:text-[#c2410c] hover:underline cursor-pointer"
              >
                {isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
              </button>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400">
            <button onClick={() => onNavigate('landing')} className="hover:text-[#ea580c] cursor-pointer">Trang chủ</button>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <button className="hover:text-[#ea580c] cursor-pointer">Điều khoản</button>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <button className="hover:text-[#ea580c] cursor-pointer">Bảo mật</button>
          </div>
        </div>
      </main>

      {/* Right: Branding Panel */}
      <aside className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-tr from-[#6b21a8] via-[#ea580c] to-[#f97316] items-center justify-center overflow-hidden h-screen max-h-screen">
        {/* Animated fluid blur elements */}
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-[#fed7aa]/25 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[10%] left-[20%] w-[45%] h-[45%] bg-[#c2410c]/30 rounded-full blur-[120px] animate-pulse pointer-events-none" />

        <div className="absolute inset-0 z-0">
          <img
            alt="AI Network Visualization"
            className="w-full h-full object-cover mix-blend-overlay opacity-25 scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjb8W6vfiSfU7-0RwrQsqXaPsukMt7P35VlIIImo41_GbBGPfhKKULZPMP-x9EWuaQwCiNu3q6316rU7WOoZP4ea26sio4VocpIqRzuSWd35On36YQCCbQzx83QOftN1b1aoZHy_Vos7J1EYVhESo9qRvl67O05mge3_1zxKmD9CiktYDvg3wyeqzcC0XWGNwdLH77iP18VV7fuO4lUkdK6S8l-3s3wdsnUIQ_KxRTo3PTq94F-jDT_tA33LSkxkaNnIPLVA1JJOw"
          />
        </div>

        <div className="relative z-10 p-10 max-w-lg text-left">
          <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/20 rounded-full blur-2xl" />

            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white border border-white/25">
              <SafetyCertificateOutlined style={{ fontSize: 24 }} />
            </div>
            
            <h2 className="text-3xl font-black text-white mb-4 leading-tight tracking-tight">
              Mở khóa tri thức cùng Trợ lý Học tập AI
            </h2>
            
            <p className="text-xs text-white/80 mb-8 leading-relaxed font-semibold">
              Tự động hóa phân loại, phân tích học trình cá nhân và giải đáp kiến thức nâng cao với công nghệ học sâu tích hợp.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 text-white font-bold">
              {[
                { num: '50k+', label: 'Sinh viên' },
                { num: '1M+', label: 'Tài liệu' },
                { num: '98%', label: 'Hài lòng' },
              ].map((s, i) => (
                <div key={i} className="group hover:scale-105 transition-all duration-300">
                  <p className="text-2xl font-black bg-gradient-to-r from-white to-[#ffedd5] bg-clip-text text-transparent">
                    {s.num}
                  </p>
                  <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
