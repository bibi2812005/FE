/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { createDatabaseConnection } from "./src/config/index.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GenAI client to prevent startup crashes if key is missing
let aiClient = null;

function getGenAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is missing. Vui lòng thiết lập key trong file .env");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API: Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. API: Register user
app.post("/api/register", async (req, res) => {
  try {
    const { email_or_username, password } = req.body;

    if (!email_or_username || !password) {
      return res.status(400).json({ success: false, message: "Vui lòng điền đầy đủ thông tin đăng ký." });
    }

    const connection = await createDatabaseConnection();
    await connection.execute(
      "INSERT INTO users (email_or_username, password_hash) VALUES (?, ?)",
      [email_or_username, password]
    );
    await connection.end();

    return res.json({ success: true, message: "Đăng ký tài khoản thành công." });
  } catch (error) {
    console.error("Register API Error:", error);
    return res.status(500).json({ success: false, message: error.message || "Lỗi máy chủ khi đăng ký." });
  }
});

// 3. API: Standard AI Chat
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { prompt, history = [], documentContext = "", documentName = "" } = req.body;

    if (!prompt) {
      res.status(400).json({ error: "Tham số prompt không được để trống" });
      return;
    }

    const ai = getGenAI();

    const contents = [];
    
    for (const msg of history) {
      contents.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    }

    contents.push({
      role: "user",
      parts: [
        {
          text: documentContext 
            ? `Dựa trên tài liệu "${documentName}" có nội dung sau:\n---\n${documentContext}\n---\nYêu cầu người dùng: ${prompt}`
            : prompt
        }
      ],
    });

    let systemInstruction = "Bạn là vị Trợ lý học tập AI siêu việt trong nền tảng 'AI Study Hub'. Hãy hồi đáp một cách chuyên nghiệp, dễ thương, truyền cảm hứng bằng tiếng Việt. Sử dụng cấu trúc Markdown rõ ràng, danh sách gạch đầu dòng và công thức nếu cần. Đừng bao giờ trả lời quá ngắn gọn hời hợt, nhưng cũng giữ câu trả lời vừa đủ súc tích, trực quan.";
    
    if (documentName) {
      systemInstruction += `\nĐặc biệt: Hãy chú ý trả lời chính xác, thông thái dựa trên tài liệu "${documentName}" mà người dùng đang mở ở khung Context bên phải.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "Xin lỗi, tôi không thể xử lý yêu cầu lúc này." });
  } catch (error) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ 
      error: error.message || "Đã xảy ra lỗi hệ thống ở phía máy chủ.",
      keyMissing: !process.env.GEMINI_API_KEY 
    });
  }
});

// 3. API: Generate smart summary
app.post("/api/gemini/summarize", async (req, res) => {
  try {
    const { documentName, documentContent } = req.body;

    if (!documentContent) {
      res.status(400).json({ error: "Nội dung tài liệu trống" });
      return;
    }

    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Hãy đọc và viết một bản tóm tắt cực kỳ chuyên nghiệp trực quan bằng tiếng Việt cho tài liệu "${documentName}". Bản tóm tắt phải bao gồm:\n1. Chủ đề cốt lõi\n2. 3-4 ý chính nổi bật (gạch đầu dòng)\n3. 1 lời khuyên thực tế học tập về tài liệu này.\nSử dụng định dạng Markdown đẹp mắt.\n\nTài liệu:\n${documentContent}`,
    });

    res.json({ summary: response.text || "Không thể tóm tắt tài liệu." });
  } catch (error) {
    console.error("Gemini Summarize API Error:", error);
    res.status(500).json({ 
      error: error.message || "Không thể khởi tạo tóm tắt thông tin tài liệu.",
      keyMissing: !process.env.GEMINI_API_KEY
    });
  }
});

// Serve frontend with Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AI Study Hub Server] listening on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
