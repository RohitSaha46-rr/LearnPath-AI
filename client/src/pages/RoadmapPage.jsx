import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGenerateRoadmapMutation } from "../redux/api/authApiSlice";
import { logout } from "../redux/features/auth/authSlice";
import Navbar from "../components/Navbar/Navbar";

const RoadmapPage = () => {
  const dispatch = useDispatch();
  const [roadmap, setRoadmap] = useState(null);
  const [generateRoadmap, { isLoading, error }] = useGenerateRoadmapMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const topic = location.state?.topic;
  const level = location.state?.level || "beginner";

  const durationMap = { beginner: "2 Months", intermediate: "3 Months", advanced: "4 Months" };
  const duration = durationMap[level];

  const called = useRef(false);

  useEffect(() => {
    if (!topic) { navigate("/dashboard"); return; }
    if (called.current) return;
    called.current = true;
    const fetchRoadmap = async () => {
      const res = await generateRoadmap({ topic, level });
      console.log("🤖 AI Roadmap Response:", res);
      if (res.data) {
        console.log("✅ Roadmap Data:", res.data.roadmap);
        setRoadmap(res.data.roadmap);
      }
    };
    fetchRoadmap();
  }, [topic]);

  const logOutPage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
    <Navbar
       onLogout={logOutPage}
    />
    <div style={{ minHeight: "100vh", background: "#f0f4f8", padding: "2.5rem 1rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.4rem" }}>Your {topic} Learning Roadmap</h1>
          <p style={{ color: "#6b7280" }}>AI-generated personalized path to master {topic}</p>
        </div>

        {/* Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "1.25rem 1.5rem", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "1.5rem", color: "#06b6d4" }}>🎯</span>
            <div>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.2rem" }}>Level</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", textTransform: "capitalize" }}>{level}</div>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: "1.25rem 1.5rem", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "1.5rem", color: "#06b6d4" }}>🕐</span>
            <div>
              <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: "0.2rem" }}>Estimated Duration</div>
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>{duration}</div>
            </div>
          </div>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1.5rem" }}>
          🧠 Your Learning Path
        </div>

        {/* Loading */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#06b6d4" }}>
            ⏳ Generating your roadmap with AI...
          </div>
        )}

        {/* Error */}
        {error && (
          <p style={{ color: "red" }}>Failed to generate roadmap. Make sure you're logged in.</p>
        )}

        {/* Nodes List */}
        {roadmap && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {roadmap.nodes.map((node, index) => (
                <div
                  key={node.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "#06b6d4", color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "0.85rem", flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <span style={{ fontWeight: 500, fontSize: "0.95rem" }}>{node.title}</span>
                  </div>
                  <span style={{ color: "#9ca3af", fontSize: "1.1rem" }}>⊙</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                width: "100%", padding: "1rem",
                background: "#06b6d4", color: "#fff",
                border: "none", borderRadius: 10,
                fontWeight: 600, fontSize: "1rem",
                cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: "0.5rem"
              }}
            >
              Start Learning {topic} &nbsp;›
            </button>
          </>
        )}
        </div>
      </div>
    </div>
    </>
  );
};

export default RoadmapPage;
