import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import Navbar from "../components/Navbar/Navbar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const levels = [
    { value: "beginner", label: "Beginner", color: "#22c55e" },
    { value: "intermediate", label: "Intermediate", color: "#f59e0b" },
    { value: "advanced", label: "Advanced", color: "#ef4444" },
  ];

  const user = useSelector((state) => state.auth.user);
  const username =
    user?.username ||
    user?.fullName ||
    user?.name ||
    (user?.email ? user.email.split("@")[0] : null) ||
    "there";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic.trim() || !level) return;
    navigate("/roadmap", { state: { topic, level } });
  };

  const progress = user.progress || [];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8" }}>
      <Navbar onLogout={handleLogout} />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Welcome */}
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.4rem" }}>
          Welcome back, {username}! 👋
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          Continue your learning journey or start something new
        </p>

        {/* Start Learning Card */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "1.75rem", marginBottom: "2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
            ✦ Start Learning
          </div>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "1.2rem" }}>
            Tell us what you want to learn and we'll create a personalized roadmap
          </p>
          <form onSubmit={handleGenerate}>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="I want to learn React..."
                style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: 8, border: "1px solid #d1d5db", fontSize: "1rem", outline: "none" }}
              />
              {/* Level Dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ padding: "0.75rem 1rem", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 160, justifyContent: "space-between" }}
                >
                  {level ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: levels.find(l => l.value === level)?.color, display: "inline-block" }} />
                      {levels.find(l => l.value === level)?.label}
                    </span>
                  ) : "Select Level"}
                  <span style={{ fontSize: "0.75rem" }}>▾</span>
                </button>
                {showDropdown && (
                  <div style={{ position: "absolute", top: "110%", right: 0, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 10, minWidth: 180, padding: "0.5rem 0" }}>
                    {levels.map((l) => (
                      <div
                        key={l.value}
                        onClick={() => { setLevel(l.value); setShowDropdown(false); }}
                        style={{ padding: "0.65rem 1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.95rem" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <span style={{ width: 12, height: 12, borderRadius: "50%", background: l.color, display: "inline-block" }} />
                        {l.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "#06b6d4", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
            >
              ⊕ Generate Roadmap
            </button>
          </form>
        </div>

        {/* My Courses */}
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            📖 My Courses
          </h2>
          <div style={{ background: "#fff", borderRadius: 12, padding: "3rem 1.5rem", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
            {progress.length === 0 ? (
              <>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🧠</div>
                <p style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.4rem" }}>No courses yet</p>
                <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Start your learning journey by generating your first roadmap above</p>
              </>
            ) : (
              progress.map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #f3f4f6" }}>
                  <span style={{ fontWeight: 600 }}>{p.topic}</span>
                  <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{p.progress}% • {p.totalNodes} nodes</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
