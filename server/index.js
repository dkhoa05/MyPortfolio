const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 1) API CV data
app.get("/api/profile", (req, res) => {
  res.json({
    name: "Trần Đăng Khoa",
    title: "Thực tập sinh Web Developer (Front-end & Backend)",
    location: "Vĩnh Long, Vietnam",
    email: "tdkhoaa205@gmail.com",
    phone: "0907 089 280",
    github: "https://github.com/dkhoa05",
    linkedin: "https://linkedin.com/in/dang-khoa-tran-0065a0371",
    summary:
      "Ứng tuyển vị trí Thực tập sinh Web Developer với định hướng phát triển kỹ năng xây dựng ứng dụng web toàn diện...",
    skills: {
      frontend: ["HTML5", "CSS3", "JavaScript", "ReactJS"],
      backend: ["Node.js", "Python (Flask)", "PHP"],
      database: ["MongoDB", "MySQL"],
      tools: ["Git", "GitHub", "Postman", "Figma", "Docker"],
      soft: [
        "Làm việc nhóm",
        "Giải quyết vấn đề",
        "Quản lý thời gian",
        "Tiếng Anh: giao tiếp cơ bản & đọc hiểu tài liệu kỹ thuật",
      ],
    },
    projects: [
      {
        name: "QuizSystem",
        stack: ["Python", "Flask", "HTML", "CSS"],
        bullets: [
          "Thiết kế giao diện làm bài thi bằng HTML/CSS",
          "Xử lý logic bằng Flask trong môi trường venv",
          "Lưu trữ dữ liệu câu hỏi/kết quả (DB tùy chọn)",
        ],
        link: "",
      },
      {
        name: "Demo Chatbox AI",
        stack: ["Python", "Gemini API", "HTML", "CSS", "JavaScript"],
        bullets: [
          "Thiết kế giao diện chat tương tác",
          "Gọi Gemini API (Google AI Studio) để tạo phản hồi",
          "Xử lý request/response và hiển thị kết quả lên UI",
        ],
        link: "",
      },
    ],
    certificates: [
      "Gemini Certified Educator – Google for Education (2025)",
      "Cloud Fundamentals – LearnKartS (2025)",
      "Agile Team Leadership – Duke University (2025)",
      "Virtualization, Docker & Kubernetes for Data Engineering – Duke University (2025)",
      "AI Workflow: Machine Learning, Visual Recognition and NLP – IBM (2025)",
      "Advanced Chatbots with Deep Learning and Python – Packt (2025)",
    ],
    education: {
      school: "Đại học Văn Lang",
      major: "Công nghệ thông tin – Công nghệ phần mềm",
      gpa: "2.79/4.0",
    },
  });
});

// 2) Contact form (tạm thời log, sau muốn gửi mail thì bật nodemailer)
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  console.log("[CONTACT]", { name, email, message });
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
