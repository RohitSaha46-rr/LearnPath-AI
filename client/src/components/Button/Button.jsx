// ============================================================
// components/Button.jsx — Reusable Button Component
//
// Props:
//   children   → Button label text
//   onClick    → Click handler function
//   variant    → "primary" | "outline" | "ghost"  (default: "primary")
//   size       → "sm" | "md" | "lg"               (default: "md")
//   type       → HTML button type                  (default: "button")
//   disabled   → boolean                           (default: false)
//   fullWidth  → boolean, makes button 100% wide   (default: false)
//   className  → extra CSS classes if needed
//
// Usage examples:
//   <Button size="lg" onClick={handleStart}>Start Learning Free</Button>
//   <Button size="lg" variant="outline" onClick={handleSignIn}>Sign In</Button>
//   <Button size="sm" variant="ghost">Cancel</Button>
// ============================================================

import React from "react";
import styles from "./button.module.css";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  // Build class names dynamically
  const sizeClass = styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const variantClass = styles[variant];
  const fullWidthClass = fullWidth ? styles.fullWidth : "";

  const buttonClasses = [
    styles.button,
    sizeClass,
    variantClass,
    fullWidthClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;

