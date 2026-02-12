import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function ButtonLink({ href, children, variant = "primary" }) {
  return (
    <a className={`btn ${variant}`} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Section({ title, subtitle, children, id }) {
  return (
    <section className="section" id={id}>
      <div className="sectionHead">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p className="muted">{subtitle}</p> : null}
        </div>
      </div>
      <div className="sectionBody">{children}</div>
    </section>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- EDIT THESE LINKS (FAST) ---
  // If your API doesn't include github/demo links per project yet, you can hardcode here:
  const projectLinks = useMemo(
    () => ({
      QuizSystem: {
        github: "https://github.com/dkhoa05/QuizSystem", // TODO: replace with repo link
        demo: "https://example.com", // TODO: replace with deployed demo link
      },
      "Demo Chatbox AI": {
        github: "https://github.com/dkhoa05/Demo_Chatbox_AI", // TODO: replace with repo link
        demo: "https://example.com", // TODO: replace with deployed demo link
      },
    }),
    []
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    axios
      .get(`${API_BASE}/api/profile`)
      .then((res) => {
        if (!mounted) return;
        setData(res.data);
      })
      .catch(() => {
        // fallback nếu backend chưa chạy
        if (!mounted) return;
        setData({
          name: "Trần Đăng Khoa",
          title: "Thực tập sinh Web Developer (Front-end & Backend)",
          location: "Vĩnh Long, Vietnam",
          email: "tdkhoaa205@gmail.com",
          phone: "0907 089 280",
          github: "https://github.com/dkhoa05",
          linkedin: "https://www.linkedin.com/in/dang-khoa-tran-0065a0371/",
          summary:
            "Ứng tuyển vị trí Thực tập sinh Web Developer với định hướng phát triển kỹ năng xây dựng ứng dụng web toàn diện, từ giao diện người dùng đến xử lý phía server. Mong muốn được tham gia dự án thực tế để nâng cao kỹ năng, tư duy sản phẩm và khả năng làm việc nhóm.",
          skills: {
            frontend: ["HTML", "CSS", "JavaScript", "ReactJS"],
            backend: ["Node.js", "Python", "PHP", "Java"],
            database: ["MongoDB", "MySQL"],
            tools: ["Git", "GitHub", "Postman", "Figma", "Docker", "AZURE", "Axure RP"],
            soft: [
              "Làm việc nhóm",
              "Giải quyết vấn đề",
              "Quản lý thời gian",
              "Chủ động học hỏi",
              "Giao tiếp tiếng Anh cơ bản",
            ],
          },
          projects: [
            {
              name: "QuizSystem",
              stack: ["Python", "Flask", "HTML", "CSS"],
              bullets: [
                "Thiết kế giao diện làm bài thi bằng HTML/CSS",
                "Xử lý logic bằng Flask trong môi trường venv",
                "Lưu trữ dữ liệu câu hỏi/kết quả (MongoDB/MySQL tùy chọn)",
                "Tối ưu hiển thị và trải nghiệm người dùng (layout rõ ràng, dễ thao tác)",
              ],
            },
            {
              name: "Demo Chatbox AI",
              stack: ["Python", "Gemini API", "HTML", "CSS", "JavaScript"],
              bullets: [
                "Thiết kế giao diện chat tương tác (input, bubble, trạng thái phản hồi)",
                "Tích hợp Gemini API (Google AI Studio) để tạo phản hồi",
                "Xử lý request/response và hiển thị kết quả lên UI",
                "Tách cấu trúc code rõ ràng, dễ mở rộng thêm tính năng",
              ],
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
            major: "Công nghệ Thông tin – Công nghệ Phần mềm",
            years: "2023 – 2027 (Dự kiến tốt nghiệp)",
            gpa: "2.79/4.0",
          },
        });
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const avatarSrc = "/avatar.jpg"; // put in public/avatar.jpg
  const pdfSrc = "/CV-TranDangKhoa.pdf"; // put in public/CV-TranDangKhoa.pdf

  if (loading && !data) {
    return (
      <div className="page">
        <div className="container">
          <div className="skeleton heroSk" />
          <div className="skeleton boxSk" />
          <div className="skeleton boxSk" />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="topbar">
        <div className="container topbarInner">
          <div className="brand">DK • Portfolio</div>
          <nav className="nav">
            <a href="#projects">Dự án</a>
            <a href="#skills">Kỹ năng</a>
            <a href="#certs">Chứng chỉ</a>
            <a href="#contact">Liên hệ</a>
          </nav>
        </div>
      </div>

      <div className="container">
        {/* HERO */}
        <header className="hero">
          <div className="heroLeft">
            <div className="avatarWrap">
              {/* fallback nếu chưa có avatar */}
              <img
                src={avatarSrc}
                alt="Avatar"
                className="avatar"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.classList.add("avatarFallback");
                }}
              />
              <div className="avatarFallbackInner">
                <div className="avatarInitials">
                  {data?.name
                    ?.split(" ")
                    ?.slice(-2)
                    ?.map((w) => w[0])
                    ?.join("") || "DK"}
                </div>
              </div>
            </div>

            <div>
              <h1 className="title">{data?.name}</h1>
              <p className="subtitle">
                {data?.title} <span className="dot">
                  <br></br></span> {data?.location}
              </p>

              <div className="ctaRow">
                <ButtonLink href={data?.github} variant="primary">
                  GitHub
                </ButtonLink>
                <ButtonLink href={data?.linkedin} variant="ghost">
                  LinkedIn
                </ButtonLink>
                <a className="btn ghost" href={`mailto:${data?.email}`}>
                  Email
                </a>

                {/* Download CV */}
                <a className="btn subtle" href={pdfSrc} download>
                  Tải CV PDF
                </a>
              </div>

              <div className="metaRow">
                <div className="meta">
                  <span className="metaK">📞</span>
                  <span className="metaV">{data?.phone}</span>
                </div>
                <div className="meta">
                  <span className="metaK">✉️</span>
                  <span className="metaV">{data?.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="heroRight">
            <div className="card emphasis">
              <h3>Mục tiêu</h3>
              <p className="muted">{data?.summary}</p>
              <div className="tags">
                <Pill>React</Pill>
                <Pill>Node.js</Pill>
                <Pill>Flask</Pill>
                <Pill>Web Dev</Pill>
              </div>
            </div>

            <div className="card">
              <h3>Học vấn</h3>
              <div className="eduLine">
                <b>{data?.education?.major}</b>
                <div className="muted">{data?.education?.school}</div>
                <div className="muted">{data?.education?.years}</div>
                <div className="muted">GPA: {data?.education?.gpa}</div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <main className="grid">
          <div className="col">
            <Section
              id="projects"
              title="Dự án nổi bật"
              subtitle="Chọn lọc những dự án thể hiện được kỹ năng và tiềm năng."
            >
              <div className="cards">
                {(data?.projects || []).map((p) => {
                  const links = projectLinks[p.name] || {};
                  return (
                    <div className="card projectCard" key={p.name}>
                      <div className="projectTop">
                        <div>
                          <h3 className="projectTitle">{p.name}</h3>
                          <div className="stackRow">
                            {(p.stack || []).map((s) => (
                              <Pill key={s}>{s}</Pill>
                            ))}
                          </div>
                        </div>

                        <div className="projectBtns">
                          {links.github ? (
                            <ButtonLink href={links.github} variant="ghost">
                              GitHub
                            </ButtonLink>
                          ) : null}
                          {links.demo ? (
                            <ButtonLink href={links.demo} variant="primary">
                              Demo
                            </ButtonLink>
                          ) : null}
                        </div>
                      </div>

                      <ul className="bullets">
                        {(p.bullets || []).map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section id="certs" title="Chứng chỉ" subtitle="Những chứng chỉ đã đạt được liên quan đến công việc.">
              <div className="card">
                <ul className="list">
                  {(data?.certificates || []).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          <aside className="aside">
            <Section id="skills" title="Kỹ năng" subtitle="Những kỹ năng chuyên môn và mềm có liên quan.">
              <div className="card">
                <div className="skillGroup">
                  <div className="skillLabel">Frontend</div>
                  <div className="skillItems">
                    {data?.skills?.frontend?.map((x) => (
                      <Pill key={x}>{x}</Pill>
                    ))}
                  </div>
                </div>

                <div className="divider" />

                <div className="skillGroup">
                  <div className="skillLabel">Backend</div>
                  <div className="skillItems">
                    {data?.skills?.backend?.map((x) => (
                      <Pill key={x}>{x}</Pill>
                    ))}
                  </div>
                </div>

                <div className="divider" />

                <div className="skillGroup">
                  <div className="skillLabel">Database</div>
                  <div className="skillItems">
                    {data?.skills?.database?.map((x) => (
                      <Pill key={x}>{x}</Pill>
                    ))}
                  </div>
                </div>

                <div className="divider" />

                <div className="skillGroup">
                  <div className="skillLabel">Tools</div>
                  <div className="skillItems">
                    {data?.skills?.tools?.map((x) => (
                      <Pill key={x}>{x}</Pill>
                    ))}
                  </div>
                </div>

                <div className="divider" />

                <div className="skillGroup">
                  <div className="skillLabel">Kỹ năng mềm</div>
                  <ul className="softList">
                    {data?.skills?.soft?.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="contact" title="Liên hệ" subtitle="">
              <ContactCard defaultEmail={data?.email} />
            </Section>
          </aside>
        </main>

        <footer className="footer">
          <div className="muted">
            © {new Date().getFullYear()} {data?.name}. Built with React + Node.
          </div>
        </footer>
      </div>
    </div>
  );
}

function ContactCard({ defaultEmail }) {
  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "idle", text: "" });

  const onChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", text: "Đang gửi..." });

    try {
      await axios.post(`${API_BASE}/api/contact`, form);
      setStatus({ type: "ok", text: "Gửi xong. Nếu tao là HR, tao sẽ rep sớm (chắc vậy)." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({ type: "err", text: "Gửi fail. Backend chưa chạy hoặc bị CORS. Check lại." });
    }
  };

  return (
    <div className="card">
      <form className="form" onSubmit={submit}>
        <div className="formRow">
          <label>Họ tên</label>
          <input value={form.name} onChange={onChange("name")} placeholder="Tên của bạn" />
        </div>

        <div className="formRow">
          <label>Email</label>
          <input value={form.email} onChange={onChange("email")} placeholder="Email của bạn" />
        </div>

        <div className="formRow">
          <label>Nội dung</label>
          <textarea
            value={form.message}
            onChange={onChange("message")}
            placeholder="Nhắn nhanh gì đó..."
            rows={4}
          />
        </div>

        <button className="btn primary" type="submit" disabled={status.type === "loading"}>
          Gửi
        </button>

        {defaultEmail ? (
          <div className="muted small" style={{ marginTop: 10 }}>
            Hoặc gửi thẳng về: <a href={`mailto:${defaultEmail}`}>{defaultEmail}</a>
          </div>
        ) : null}

        {status.type !== "idle" ? (
          <div className={`toast ${status.type}`}>{status.text}</div>
        ) : null}
      </form>
    </div>
  );
}
