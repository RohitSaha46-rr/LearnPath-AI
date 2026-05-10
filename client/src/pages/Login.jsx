import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useGoogleloginMutation, useLoginMutation } from "../redux/api/authApiSlice";
import { setCredentials } from "../redux/features/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const [googlelogin] = useGoogleloginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(form).unwrap();
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      dispatch(setCredentials({ user: res.user, token: res.token }));
      navigate("/dashboard");
    } catch (err) {
      setError(err?.data?.message || "Login failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await googlelogin({ credential: credentialResponse.credential }).unwrap();
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      dispatch(setCredentials({ user: res.user, token: res.token }));
      navigate("/dashboard");
    } catch (err) {
      setError(err?.data?.message || "Google login failed");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>🧠</div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue your learning journey</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" disabled={isLoading} className={styles.submitBtn}>
            {isLoading ? "Signing In…" : "Sign In"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "4px 0" }}>
            <hr style={{ flex: 1, borderColor: "#e1e8f5" }} />
            <span style={{ color: "#6f7f99", fontSize: "13px" }}>or</span>
            <hr style={{ flex: 1, borderColor: "#e1e8f5" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed")}
              width="356"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          <p className={styles.switchText}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;