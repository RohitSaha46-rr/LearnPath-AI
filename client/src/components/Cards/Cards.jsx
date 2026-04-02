import { Sparkles, Book, Brain } from "lucide-react";
import styles from "./cards.module.css";

const Cards = ({ items }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "sparkles":
        return <Sparkles size={24} />;
      case "book":
        return <Book size={24} />;
      case "brain":
        return <Brain size={24} />;
      default:
        return <Sparkles size={24} />;
    }
  };

  return (
    <section className={styles.cardsSection}>
      <div className={styles.cardGrid}>
        {items.map(({ id, title, description, icon, accent }, i) => (
          <article key={id || i} className={styles.card}>
            <div className={styles.iconWrap} style={{ backgroundColor: accent }}>
              {getIcon(icon)}
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardText}>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Cards;
