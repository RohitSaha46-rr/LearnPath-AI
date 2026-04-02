import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";
import Cards from "../components/Cards/Cards";
import AdBox from "../components/AdBox/AdBox";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";

const HERO_CARDS = [
  {
    id: "roadmaps",
    icon: "brain",
    title: "AI-Generated Roadmaps",
    description: "Get personalized learning paths created by AI, tailored to your chosen technology and skill level.",
    accent: "#0ea5e9",
  },
  {
    id: "step-by-step",
    icon: "book",
    title: "Step-by-Step Learning",
    description: "Progress through topics one at a time with gated content that unlocks as you complete each lesson.",
    accent: "#fb6f54",
  },
  {
    id: "progress",
    icon: "sparkles",
    title: "Track Your Progress",
    description: "Monitor your learning journey with detailed progress tracking and visual indicators for each course.",
    accent: "#22c55e",
  },
];

const Home = () => {

  const navigate= useNavigate()
  const onLoginIn=()=>{
navigate("/login")
  }
  const onSignUp=()=>{
    navigate("/signup")
  }
  return (
    <div className={styles.page}>
      {/* Navbar */}
      <Navbar
        onLogin={onLoginIn}
        onGetStarted={onSignUp}
      />

      {/* Hero Section */}
      <main className={styles.heroSection}>
        {/* Main Headline */}
        <h1 className={styles.heroTitle}>
          AI-Powered Learning
          <br />
          <span className={styles.heroHighlight}>Personalized</span>
          {" "}for You
        </h1>

        {/* Subtitle */}
        <p className={styles.heroSubtitle}>
          Master any technology with AI-generated roadmaps, step-by-step lessons,
          and adaptive learning paths tailored to your goals.
        </p>

        {/* CTA Buttons */}
        <div className={styles.ctaGroup}>
          <Button size="lg" variant="primary" onClick={onSignUp}>
            Start Learning Free
          </Button>
          <Button size="lg" variant="outline" onClick={onLoginIn}>
            Sign In
          </Button>
        </div>
      </main>

      {/* Live cards section */}
      <Cards items={HERO_CARDS} />

      {/* Ad box section */}
      <AdBox
        title="Ready to Start Learning?"
        text="Join thousands of learners mastering new technologies with AI-powered guidance."
        ctaLabel="Create Free Account"
        onCta={onSignUp}
      />
    </div>
  );
};

export default Home;
