import { useSelector } from "react-redux";
import Button from "../Button/Button";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = ({ onLogin, onGetStarted, onLogout }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const username =
    user?.username ||
    user?.fullName ||
    user?.name ||
    (user?.email ? user.email.split("@")[0] : null) ||
    "User";
  const showLogout = isAuthenticated;

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.brand}>
        {/* Brain icon SVG */}
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ marginRight: 8 }}>
          <path
            d="M9.5 2a4.5 4.5 0 0 1 4.5 4.5v.5h.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-1 2.45A3.5 3.5 0 0 1 15.5 19H9a5 5 0 0 1-5-5v-1.5A4.5 4.5 0 0 1 9.5 8V7.5A4.5 4.5 0 0 1 9.5 2z"
            fill="#0ea5e9"
          />
          <circle cx="16" cy="8" r="2.5" fill="#0ea5e9" opacity="0.7" />
        </svg>
        <Link to="/"><span className={styles.brandText}>LearnAI</span></Link>
      </div>

      {/* Nav buttons */}
      <div className={styles.navActions}>
        {showLogout ? (
          <>
            <span className={styles.userName}>Hi, {username}</span>
            <button className={styles.loginLink} onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className={styles.loginLink} onClick={onLogin}>
              Login
            </button>
            <Button size="md" variant="primary" onClick={onGetStarted}>
              Get Started
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
