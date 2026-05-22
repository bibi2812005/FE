/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Form, Checkbox, Divider, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginScreen({ onLoginSuccess, onNavigate, currentView }) {
  const [isRegister, setIsRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsRegister(currentView === 'register');
    setErrorMsg('');
    form.resetFields();
  }, [currentView, form]);

  const handleSubmit = async (values) => {
    setErrorMsg('');
    setIsLoading(true);

    // High-end simulated loading delay
    await new Promise(resolve => setTimeout(resolve, 800));

    setIsLoading(false);
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

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsLoading(false);
    message.success('Đăng nhập bằng Google Workspace thành công!');
    onLoginSuccess('vuongbaovipvip@gmail.com');
  };

  return (
    <div className="bg-[#fafafb] text-[#1d1d1f] h-screen max-h-screen overflow-hidden flex flex-row font-sans w-full select-none relative grid-mesh">
      {/* Visual lighting background blooms */}
      <div className="absolute top-[-15%] left-[-10%] w-[35%] h-[35%] bg-[#ff5c00]/3 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] right-[35%] w-[30%] h-[30%] bg-[#007aff]/2 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Left: Dynamic Form Panel with beautiful split layout */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 py-6 lg:px-16 z-10 bg-white/85 backdrop-blur-3xl relative max-h-screen overflow-y-auto border-r border-black/5">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[390px] py-4"
        >
          {/* Brand Logo header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div
              className="flex items-center gap-3 mb-2 cursor-pointer group"
              onClick={() => onNavigate('landing')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff8a00] to-[#ff5c00] rounded-xl flex items-center justify-center shadow-lg orange-glow group-hover:scale-105 transition-transform duration-300 text-white">
                <i className="bi bi-stars text-[20px] animate-gentle-pulse" />
              </div>
              <div className="text-left">
                <h1 className="text-[23px] font-bold text-black tracking-tight">
                  AI Study Hub
                </h1>
                <span className="text-[9px] font-bold text-black/40 tracking-wider uppercase block">
                  Cổng Học Tập Thông Minh
                </span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-[#ff5c00] uppercase tracking-wider bg-[#ff5c00]/10 border border-[#ff5c00]/20 rounded-full px-3.5 py-1 mt-3 inline-block">
              {isRegister ? 'Đăng ký tài khoản học viên' : 'Hệ thống số hóa tri thức'}
            </p>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl py-3 px-4 border border-[#ff3b30]/20 bg-[#ff3b30]/5 text-[#ff3b30] flex items-center gap-2"
                >
                  <i className="bi bi-exclamation-triangle-fill text-[14px]" />
                  <span className="text-[12px] font-bold">{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ usernameOrEmail: 'vuongbaovipvip@gmail.com', password: '12345678', remember: true }}
              requiredMark={false}
            >
              {/* Username Input with luxury custom states */}
              <Form.Item
                label={<span className="text-[10px] font-bold text-black/50 uppercase tracking-wider">Email hoặc Tên đăng nhập</span>}
                name="usernameOrEmail"
                rules={[{ required: true, message: 'Vui lòng điền thông tin đăng nhập!' }]}
              >
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-black/35"><i className="bi bi-person text-[15px]" /></span>
                  <input
                    type="text"
                    placeholder="name@university.edu.vn"
                    className="w-full bg-black/[0.01] border border-black/8 rounded-xl pl-10 pr-4 py-2.5 text-black text-[13px] placeholder-black/20 outline-none focus:border-[#ff5c00] focus:ring-1 focus:ring-[#ff5c00] transition-all"
                    onChange={(e) => form.setFieldsValue({ usernameOrEmail: e.target.value })}
                  />
                </div>
              </Form.Item>

              {/* Password Input with interactive show/hide toggle */}
              <Form.Item
                label={<span className="text-[10px] font-bold text-black/50 uppercase tracking-wider">Mật khẩu</span>}
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-black/35"><i className="bi bi-lock text-[15px]" /></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-black/[0.01] border border-black/8 rounded-xl pl-10 pr-10 py-2.5 text-black text-[13px] placeholder-black/20 outline-none focus:border-[#ff5c00] focus:ring-1 focus:ring-[#ff5c00] transition-all"
                    onChange={(e) => form.setFieldsValue({ password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-black/40 hover:text-black transition-colors cursor-pointer"
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-[14px]`} />
                  </button>
                </div>
              </Form.Item>

              {isRegister && (
                <Form.Item
                  label={<span className="text-[10px] font-bold text-black/50 uppercase tracking-wider">Nhập lại mật khẩu</span>}
                  name="confirmPassword"
                  rules={[
                    { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                  ]}
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-black/35"><i className="bi bi-lock text-[15px]" /></span>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-black/[0.01] border border-black/8 rounded-xl pl-10 pr-4 py-2.5 text-black text-[13px] placeholder-black/20 outline-none focus:border-[#ff5c00] focus:ring-1 focus:ring-[#ff5c00] transition-all"
                      onChange={(e) => form.setFieldsValue({ confirmPassword: e.target.value })}
                    />
                  </div>
                </Form.Item>
              )}

              {!isRegister && (
                <div className="flex items-center justify-between mb-6">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-[12px] font-semibold text-black/55 select-none">
                      Duy trì đăng nhập
                    </Checkbox>
                  </Form.Item>
                  <button
                    type="button"
                    onClick={() => message.info('Mã khôi phục đã được gửi vào hòm thư sinh viên của bạn.')}
                    className="text-[12px] font-bold text-[#ff5c00] hover:text-[#ff8a00] transition-colors cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              )}

              <Form.Item className="mb-0">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 text-white bg-gradient-to-r from-[#ff8a00] to-[#ff5c00] font-bold rounded-xl text-[13px] border-none shadow-lg orange-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {isRegister ? 'Khởi tạo tài khoản' : 'Đăng nhập hệ thống'}{' '}
                      <i className="bi bi-arrow-right text-[14px]" />
                    </>
                  )}
                </motion.button>
              </Form.Item>
            </Form>

            <Divider className="!text-[9px] !font-extrabold !text-black/15 !uppercase !tracking-wider !my-5">
              Hoặc tiếp tục với
            </Divider>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-11 bg-black/[0.01] border border-black/8 hover:border-black/20 hover:bg-black/[0.03] rounded-xl font-semibold text-[13px] text-black flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              <img
                alt="Google"
                className="w-4 h-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ztosA2sEnMYyfeWKapcnEE90FMguHV1cdJALRFNZsLwWQ0Qu-YsF44e9KcWt1ZUhHSp4lSicxbBRrkyzw59_W1KY6NbPWiS8q9aDny9j7zfR_8yZl8DVcchvRGowiDC5VwlZ41Glqh8Q29u4hX7a9wV3ouLCA0INRDuXDMb3xtIN4mzTK4l6SHcd9DDXy2t-Iy37zmFRaJP1tpkQGz33APZhgk8K6eKCz4ZnQASu-Vbot86pZyOibEQdBQLsN2hZDUi1Q4b47U4"
              />
              <span>Google Workspace</span>
            </motion.button>

            <p className="text-[12.5px] font-semibold text-black/40 text-center pt-4">
              {isRegister ? 'Đã có tài khoản học tập?' : 'Chưa có tài khoản sinh viên?'}{' '}
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setErrorMsg('');
                  form.resetFields();
                }}
                className="text-[#ff5c00] font-bold hover:text-[#ff8a00] cursor-pointer transition-colors"
              >
                {isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
              </button>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold text-black/30 uppercase tracking-wider">
            <button onClick={() => onNavigate('landing')} className="hover:text-black cursor-pointer transition-colors">Trang chủ</button>
            <span className="w-1 h-1 rounded-full bg-black/10" />
            <button className="hover:text-black cursor-pointer transition-colors">Điều khoản</button>
            <span className="w-1 h-1 rounded-full bg-black/10" />
            <button className="hover:text-black cursor-pointer transition-colors">Bảo mật</button>
          </div>
        </motion.div>
      </main>

      {/* Right: Premium futuristic glass card side panel */}
      <aside className="hidden lg:flex lg:w-1/2 relative bg-[#f5f5f7] items-center justify-center overflow-hidden h-screen max-h-screen border-l border-black/5">
        {/* Glow lights */}
        <div className="absolute top-[15%] right-[5%] w-[45%] h-[45%] bg-[#ff5c00]/4 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[15%] w-[40%] h-[40%] bg-[#007aff]/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="absolute inset-0 z-0">
          <img
            alt="AI Network Visualization"
            className="w-full h-full object-cover mix-blend-multiply opacity-[0.04] scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjb8W6vfiSfU7-0RwrQsqXaPsukMt7P35VlIIImo41_GbBGPfhKKULZPMP-x9EWuaQwCiNu3q6316rU7WOoZP4ea26sio4VocpIqRzuSWd35On36YQCCbQzx83QOftN1b1aoZHy_Vos7J1EYVhESo9qRvl67O05mge3_1zxKmD9CiktYDvg3wyeqzcC0XWGNwdLH77iP18VV7fuO4lUkdK6S8l-3s3wdsnUIQ_KxRTo3PTq94F-jDT_tA33LSkxkaNnIPLVA1JJOw"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 p-10 max-w-lg text-left"
        >
          <div className="bg-white/80 backdrop-blur-3xl border border-black/5 p-8 rounded-[28px] relative overflow-hidden shadow-sm">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-black/5 rounded-full blur-2xl" />

            <div className="w-11 h-11 bg-black/[0.02] rounded-xl flex items-center justify-center mb-6 text-black border border-black/10 orange-glow">
              <i className="bi bi-shield-lock text-[20px] text-[#ff5c00]" />
            </div>

            <h2 className="text-[26px] font-extrabold text-black mb-4 leading-tight tracking-tight">
              Mở khóa tri thức cùng Trợ lý Học tập AI
            </h2>

            <p className="text-[13.5px] text-black/55 mb-8 leading-relaxed font-semibold">
              Tự động hóa phân loại, phân tích học trình cá nhân và giải đáp kiến thức nâng cao với công nghệ học sâu tích hợp.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/5 text-black">
              {[
                { num: '50k+', label: 'Sinh viên' },
                { num: '1M+', label: 'Tài liệu' },
                { num: '98%', label: 'Hài lòng' },
              ].map((s, i) => (
                <div key={i} className="group hover:scale-105 transition-transform duration-300">
                  <p className="text-[22px] font-extrabold text-black tracking-tight text-gradient-orange">
                    {s.num}
                  </p>
                  <p className="text-[9px] font-bold text-black/30 uppercase tracking-widest mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </aside>
    </div>
  );
}
