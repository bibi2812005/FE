/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Select, Tabs, Spin, Button, Avatar, Input, Tag, Tooltip } from 'antd';
import {
  RobotOutlined,
  SendOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  StarOutlined,
  ReloadOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { getFileTagColor, getFileTypeLabel } from '../utils/helpers.js';

export default function AIScreen({ documents, activeDoc, onSelectActiveDoc, onNavigate }) {
  const [messages, setMessages] = useState([
    {
      id: 'msg_1',
      sender: 'user',
      text: 'Tìm hiểu về phương trình Schrödinger và ý nghĩa của hàm sóng Ψ',
      timestamp: '10:40 AM',
    },
    {
      id: 'msg_2',
      sender: 'ai',
      text: `Chào Alex Nguyen! Rất vui được đồng hành cùng bạn nghiên cứu lĩnh vực Vật lý lượng tử. Dưới đây là kiến thức chi tiết về phương trình Schrödinger và bản chất hàm sóng Ψ:\n\n### 1. Phương trình Schrödinger là gì?\nPhương trình Schrödinger là phương trình vi phân nền tảng trong cơ học lượng tử.\n\nCông thức tổng quát: **iħ ∂Ψ/∂t = ĤΨ**\n\n### 2. Ý nghĩa Hàm sóng (Ψ)\n• **Biên độ xác suất:** |Ψ|² đại diện cho mật độ xác suất.\n• **Chuẩn hóa:** ∫ |Ψ|² dV = 1\n• **Quỹ đạo mờ:** Hạt lượng tử phân bố xác suất dưới dạng đám mây trạng thái.\n\nBạn có muốn tôi giải bài tập tính toán giếng thế vô hạn không?`,
      timestamp: '10:42 AM',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [activeDocSummary, setActiveDocSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [apiWarning, setApiWarning] = useState('');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!activeDoc && documents.length > 0) {
      onSelectActiveDoc(documents[0]);
    }
  }, [activeDoc, documents, onSelectActiveDoc]);

  useEffect(() => {
    if (activeDoc) triggerDocumentSummary(activeDoc);
  }, [activeDoc]);

  const triggerDocumentSummary = async (doc) => {
    setIsSummaryLoading(true);
    try {
      const response = await fetch('/api/gemini/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentName: doc.name, documentContent: doc.content || '' }),
      });
      const data = await response.json();
      if (response.ok && data.summary) {
        setActiveDocSummary(data.summary);
      } else {
        setDefaultSummary(doc);
      }
    } catch {
      setDefaultSummary(doc);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const setDefaultSummary = (doc) => {
    if (doc.name.includes('Physics') || doc.name.includes('Schrödinger')) {
      setActiveDocSummary(`### ⚛ Tóm tắt: Quantum Physics Notes.pdf\n- **Chủ đề:** Phương trình trạng thái, toán tử lượng tử.\n- **Ý chính:**\n  1. Hàm sóng phức Ψ mô tả xác suất tìm hạt.\n  2. Hamiltonian Ĥ mô phỏng tổng thế động năng.\n  3. Hạt tự do trong giếng thế 1 chiều đối xứng.\n- **Lời khuyên:** Tập trung tích phân xác định giới hạn bờ giếng thế.`);
    } else if (doc.name.includes('AI') || doc.name.includes('Giaotrinh')) {
      setActiveDocSummary(`### 🖥 Tóm tắt: Giáo trình AI Nâng Cao\n- **Chủ đề:** CNN, Transformers, LLM.\n- **Ý chính:**\n  1. Embedding biểu diễn từ vựng đa chiều.\n  2. Self-Attention giúp mô hình tập trung ngữ cảnh.\n  3. Scaling Laws đánh đổi Token và độ sâu lớp mạng.\n- **Lời khuyên:** Viết mã Attention từ con số không.`);
    } else if (doc.name.includes('Machine Learning')) {
      setActiveDocSummary(`### 📊 Tóm tắt: Bài tập Machine Learning\n- **Chủ đề:** Phân loại nhị phân, hồi quy.\n- **Ý chính:**\n  1. Logistic Regression cập nhật trọng số.\n  2. Gradient Descent cực tiểu hóa tổn thất.\n  3. Confusion Matrix (F1-Score, Recall).\n- **Đề nghị:** Sử dụng notebook để vẽ đường phân giới.`);
    } else {
      setActiveDocSummary(`### 📂 Tóm tắt: ${doc.name}\n- **Chủ đề:** Giáo trình thu thập học phần.\n- **Đặc trưng:** Tài liệu lưu trữ đám mây với định dạng được lập chỉ mục.\n- **Khuyên:** Hỏi AI "Phân tích tài liệu này" để nhận thêm kiến thức.`);
    }
  };

  const handleSendMessage = async (e, customPrompt) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || inputText;
    if (!promptToSend.trim() || isLoading) return;

    const userMsg = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setApiWarning('');

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          history: messages,
          documentContext: activeDoc?.content || '',
          documentName: activeDoc?.name || '',
        }),
      });
      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || 'Lỗi');

      setMessages((prev) => [...prev, {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai',
        text: data.text || 'Tôi chưa nhận được kết quả.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch {
      setApiWarning('⚠️ Đang hoạt động ở chế độ trợ lý ngoại tuyến. Cấu hình API key để dùng mô hình trực tiếp.');
      setTimeout(() => {
        const offlineText = `Cảm ơn bạn đã hỏi về "${promptToSend}".\n\nDựa trên tài liệu "${activeDoc?.name || 'Giáo trình'}", tôi đề xuất:\n\n1. **Phân tích khái niệm nền tảng:** Nắm rõ định nghĩa tiên đề.\n2. **Vận dụng thực hành:** Giải bài tập từ cơ bản tới nâng cao.\n3. **Mở rộng kiến thức:** Sử dụng "AI Tóm tắt" ở cột bên cạnh.\n\nBạn muốn đi sâu hơn chủ đề nào?`;
        setMessages((prev) => [...prev, {
          id: 'msg_ai_' + Date.now(),
          sender: 'ai',
          text: offlineText,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        }]);
      }, 950);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { emoji: '📝', label: 'Tóm tắt lý thuyết cốt lõi', prompt: 'Tóm tắt ý chính cốt lõi của bài giáo trình này' },
    { emoji: '🧩', label: 'Ra bài tập trắc nghiệm', prompt: 'Liệt kê các câu hỏi trắc nghiệm tự kiểm kèm đáp án' },
    { emoji: '📖', label: 'Định nghĩa khái niệm', prompt: 'Giải thích chi tiết các thuật ngữ phức tạp' },
  ];

  const tabItems = [
    {
      key: 'summary',
      label: '📖 Bản tóm tắt AI',
      children: (
        <div className="space-y-4 text-left animate-scale-up">
          {isSummaryLoading ? (
            <div className="py-16 text-center">
              <Spin size="large" />
              <p className="text-[#ea580c] text-xs font-bold mt-3">AI đang quét cấu trúc giáo trình...</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-5 border border-orange-50/50 shadow-sm relative overflow-hidden select-text">
              <div className="absolute right-3 top-3 opacity-10">
                <StarOutlined style={{ fontSize: 48, color: '#ea580c' }} />
              </div>
              <div className="text-[12px] text-slate-700 leading-relaxed font-semibold whitespace-pre-wrap select-text">
                {activeDocSummary}
              </div>
            </div>
          )}

          {activeDoc && (activeDoc.name.includes('Physics') || activeDoc.name.includes('Schrödinger')) && (
            <div className="bg-white rounded-2xl p-4 border border-orange-100/40 shadow-sm text-left space-y-3">
              <div className="flex justify-between items-center border-b border-orange-50 pb-2">
                <span className="text-[10px] font-black text-[#0b1c30] uppercase tracking-wider">Đồ thị Hàm sóng |Ψ|²</span>
                <Tag color="orange" className="text-[9px] font-extrabold rounded-full">Kênh lượng tử n=3</Tag>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <img
                  alt="Wavefunction visual"
                  className="w-full h-auto object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB93KuCgMd_KlvVRj71X7c8N_h0phZVd1lQxIPvzkWp5BIX_lEuYjq1-OTqeqa0mp7GrcdYtmmhBc705Tiiy6OfDuxFoAInFx0eiS3YNHSSz-7-HkldHlZCi7jZf5VpOI54BmBOyOGUVZIf0pDZzgCDaQLjausbc1TIu8-6ipS7S6sE51AYctjUxaHxnmzx_UTlUptmoAEXDuMVPb74nOepuTMCi_x063t_5JlBXkkl4UiYYm5NwxzetJM7HhofKqVPNlP-B9m330w"
                />
              </div>
              <p className="text-[9px] font-semibold text-slate-400 text-center">Trực quan hóa mật độ mây xác suất lượng tử.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'read',
      label: '🗒 Đọc nội dung gốc',
      children: (
        <div className="bg-white rounded-2xl p-5 border border-orange-50/50 shadow-sm text-left text-sm leading-relaxed text-[#0b1c30]/90 select-text animate-scale-up">
          <div className="flex items-center gap-1.5 border-b border-orange-100 pb-2 mb-3">
            <CheckCircleOutlined style={{ color: '#22c55e' }} />
            <p className="font-extrabold text-[11px] text-slate-500 uppercase">TIÊN ĐỀ TRÍCH XUẤC CƠ SỞ DỮ LIỆU:</p>
          </div>
          <p className="whitespace-pre-line font-medium text-[12px] leading-relaxed text-slate-700">
            {activeDoc?.content || `Nội dung tài liệu gốc chưa tải đủ.`}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#f8faff] text-[#0b1c30] h-screen flex flex-col font-sans select-none overflow-hidden max-w-full">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-orange-100/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#fff7ed] rounded-xl flex items-center justify-center text-[#ea580c] border border-orange-100 shadow-sm shrink-0">
            <RobotOutlined style={{ fontSize: 20 }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-[#0b1c30] tracking-tight">Trợ lý Học tập AI</h2>
              <Tag color="orange" className="text-[9px] font-extrabold rounded-full">gemini-3.5-flash</Tag>
            </div>
            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Đặt câu hỏi thông minh, viết tóm tắt, giải bài tập</p>
          </div>
        </div>

        {/* textbook selection upgraded to searchable select render options beautifully */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap flex items-center gap-1.5 uppercase tracking-wider">
            <ReadOutlined className="text-[#ea580c]" /> Giáo trình:
          </span>
          <Select
            showSearch
            placeholder="Tìm kiếm giáo trình..."
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            value={activeDoc?.id || undefined}
            onChange={(val) => {
              const selected = documents.find((d) => d.id === val);
              if (selected) onSelectActiveDoc(selected);
            }}
            options={documents.map((d) => ({
              value: d.id,
              label: d.name,
              type: d.type,
              size: d.size,
            }))}
            optionRender={(option) => {
              const item = option?.data || option;
              const type = item?.type || 'pdf';
              const label = item?.label || option?.label || 'Tài liệu';
              const size = item?.size || '1.5 MB';
              return (
                <div className="flex items-center gap-2 py-0.5 max-w-xs md:max-w-md truncate select-none">
                  <Tag color={getFileTagColor(type)} className="font-black text-[9px] uppercase rounded-full border-none shadow-sm scale-95 px-2 shrink-0">
                    {getFileTypeLabel(type)}
                  </Tag>
                  <span className="text-xs font-extrabold text-[#0b1c30] truncate flex-1">
                    {label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-extrabold shrink-0">
                    {size}
                  </span>
                </div>
              );
            }}
            className="w-full md:w-80 select-orange-accent font-semibold text-xs"
            popupClassName="rounded-2xl shadow-xl overflow-hidden border border-slate-100/80"
            size="middle"
          />
        </div>
      </header>

      {/* Main body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-full max-w-full">
        {/* Chat Panel */}
        <div className={`${isPanelCollapsed ? 'lg:col-span-12' : 'lg:col-span-7'} flex flex-col justify-between bg-white border-r border-[#ea580c]/10 h-full relative overflow-hidden transition-all duration-300`}>
          {/* Status bar */}
          {apiWarning ? (
            <div className="bg-[#fff7ed] border-b border-[#ffedd5] px-4 py-2.5 text-xs font-bold text-[#c2410c] text-center flex items-center justify-between gap-2 shrink-0 animate-fade-in">
              <div className="flex items-center gap-2">
                <ThunderboltOutlined className="animate-pulse" />
                <span>{apiWarning}</span>
              </div>
              <Tooltip title={isPanelCollapsed ? "Mở cột phân tích nhanh" : "Thu gọn cột phân tích nhanh"}>
                <Button
                  type="text"
                  size="small"
                  onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                  icon={isPanelCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  className="text-slate-400 hover:text-[#ea580c] rounded-lg"
                />
              </Tooltip>
            </div>
          ) : (
            <div className="bg-[#f0f9ff]/70 border-b border-[#e0f2fe] px-4 py-2 text-[11px] font-bold text-sky-800 text-center flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span>Trợ lý AI sẵn sàng phân tích cho "{activeDoc?.name || 'Tài liệu'}"</span>
              </div>
              <Tooltip title={isPanelCollapsed ? "Mở cột phân tích nhanh" : "Thu gọn cột phân tích nhanh"}>
                <Button
                  type="text"
                  size="small"
                  onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                  icon={isPanelCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  className="text-slate-400 hover:text-[#ea580c] rounded-lg h-6 w-6 flex items-center justify-center cursor-pointer"
                />
              </Tooltip>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-scale-up`}>
                <div className={`flex gap-3.5 max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-[#ea580c]/10 text-[#ea580c] border border-[#ea580c]/20' : 'bg-[#ea580c] text-white'}`}>
                    {msg.sender === 'user' ? (
                      <Avatar size={36} shape="square" className="rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBow5mVfiNdaRBNOhUCDdCECelWMAJJIH-qphguPGLIXAfufQTeX5TZ1eZPJ2RfSdkXaqpdbdRwUwLhYiIolmk3c-psChGFWbL2n9oQPwS08-ynfA4bX-5j8Sgxl14-8lsQ9I6NnQy-uqdllZ9XeAPJTOidzr-LY7Xpd1_50olXILb8G_q9AznJwl2LlMupMfzTJViLVuvF-kYTH8HYBj56IAbsBVfAUq8LFA6TipGCkhC8NWRgYYa1dTJuQEBM2wBc6vdwKHvjv3o" />
                    ) : (
                      <RobotOutlined style={{ fontSize: 16 }} />
                    )}
                  </div>
                  <div className={`rounded-2xl p-4 text-xs leading-relaxed font-medium shadow-sm text-left ${msg.sender === 'user' ? 'bg-[#ea580c] text-white rounded-tr-none' : 'bg-[#f8f9fa] text-[#0b1c30] rounded-tl-none border border-slate-100 select-text'}`}>
                    <div className="whitespace-pre-wrap text-[12px]">{msg.text}</div>
                    <div className={`text-[9px] mt-2 font-bold flex items-center gap-1 justify-end ${msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'}`}>
                      <ClockCircleOutlined style={{ fontSize: 10 }} /> {msg.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex gap-3.5 items-center text-xs font-bold text-slate-500 bg-[#f8f9fa] p-4 rounded-2xl border border-slate-100">
                  <Spin size="small" />
                  <div>
                    <p className="text-[#ea580c] text-[11px] font-black">AI đang tư duy...</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Đang tổng hợp từ: {activeDoc?.name}</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick actions + Input */}
          <div className="p-4 border-t border-orange-100/50 bg-white shadow-inner shrink-0">
            <div className="flex gap-2 overflow-x-auto pb-3 text-[10px] font-bold">
              {quickActions.map((qa, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(undefined, qa.prompt)}
                  className="px-3.5 py-1.5 bg-[#fff7ed] hover:bg-[#ea580c] hover:text-white text-[#ea580c] rounded-xl transition-all whitespace-nowrap cursor-pointer border border-[#ffedd5] shrink-0"
                >
                  {qa.emoji} {qa.label}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-2.5">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 p-0.5">
                  <PaperClipOutlined />
                </span>
                <input
                  type="text"
                  placeholder={activeDoc ? `Hỏi AI về: ${activeDoc.name}...` : 'Hỏi Trợ lý AI...'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-12 py-3.5 text-xs font-semibold outline-none focus:bg-white focus:border-[#fed7aa] focus:ring-4 focus:ring-[#ea580c]/5 transition-all text-[#0b1c30] placeholder:text-slate-400"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!inputText.trim() || isLoading}
                icon={<SendOutlined />}
                className="h-11 px-5 rounded-2xl font-bold cursor-pointer"
              >
                <span className="hidden sm:inline text-xs">Gửi AI</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Context Panel */}
        <div className={`${isPanelCollapsed ? 'hidden' : 'lg:col-span-5'} bg-[#fafbfe] flex flex-col h-full overflow-hidden transition-all duration-300`}>
          <div className="p-4 bg-white border-b border-[#ea580c]/10 flex justify-between items-center px-5 shrink-0">
            <span className="text-xs font-black text-[#0b1c30] uppercase tracking-wider flex items-center gap-1.5">
              <StarOutlined style={{ color: '#ea580c' }} /> Nội dung phân tích nhanh
            </span>
            {activeDoc && (
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={() => triggerDocumentSummary(activeDoc)}
                className="text-[10px] font-extrabold text-[#ea580c] rounded-xl cursor-pointer"
              >
                Tái tạo tóm tắt
              </Button>
            )}
          </div>

          {activeDoc ? (
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Doc info card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100/50 text-[#ea580c] flex items-center justify-center shrink-0 border border-orange-200/20">
                  <FileTextOutlined style={{ fontSize: 20 }} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h4 className="font-extrabold text-xs text-[#0b1c30] truncate">{activeDoc.name}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Dung lượng: {activeDoc.size} • Đã đồng bộ với AI</p>
                </div>
              </div>

              {/* Tabs */}
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                className="ai-context-tabs animate-scale-up"
                size="small"
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 animate-scale-up">
              <ReadOutlined style={{ fontSize: 48, color: '#ffedd5' }} className="mb-4 animate-pulse" />
              <p className="text-xs font-bold text-[#0b1c30]">Vui lòng chọn hoặc tải lên 1 tài liệu!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
