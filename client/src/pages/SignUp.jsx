import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import Button from "../components/Button/Button";
import { useSignupMutation } from "../redux/api/authApiSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
   try {
    await signup(form).unwrap();
    navigate("/login");
  } catch (err) {
    setError(err?.data?.message || "Signup failed");
  }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>🧠</div>
          <h1>Create Account</h1>
          <p>Start your AI-powered learning journey today</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="john_doe"
            autoComplete="username"
            required
          />

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
            placeholder="Create a strong password"
            autoComplete="new-password"
            required
          />

          {error && <div className={styles.error}>{error}</div>}

          {/* <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? "Creating…" : "Create Account"}
          </button> */}
          <Button fullWidth={true} variant="primary" disabled={isLoading} onClick={handleSubmit}>{isLoading ? "Creating…" : "Create Account"} </Button>

          <p className={styles.switchText}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;