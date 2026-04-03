import { Book } from "lucide-react";
import styles from "./adbox.module.css";

const AdBox = ({ title, text, ctaLabel, onCta }) => (
  <section className={styles.adBoxSection}>
    <div className={styles.adBoxCard}>
      <div className={styles.adBoxIcon}>
        <Book size={36} />
      </div>
      <div className={styles.adBoxContent}>
        <h2>{title}</h2>
        <p>{text}</p>
        <button className={styles.ctaBtn} onClick={onCta}>{ctaLabel}</button>
      </div>
    </div>
  </section>
);

export default AdBox;
