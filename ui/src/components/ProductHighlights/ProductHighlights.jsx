import styles from "./ProductHighlights.module.css";

const highlights = [
  {
    number: "01",
    icon: "calendar",
    title: "Clinic operations",
    description:
      "Bring appointment scheduling and everyday clinic workflows into a more organized workspace.",
  },
  {
    number: "02",
    icon: "records",
    title: "Patient management",
    description:
      "Support patient information and care-related workflows through a connected management experience.",
  },
  {
    number: "03",
    icon: "settings",
    title: "Configurable by design",
    description:
      "Build a foundation for clinic-specific workflows and evolving operational needs.",
  },
];

function HighlightIcon({ type }) {
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
        <path d="M7.5 3.5V7M16.5 3.5V7M3.5 10H20.5M8 14H11M8 17H14" />
      </svg>
    );
  }

  if (type === "records") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
        <path d="M9 8H15M9 12H15M9 16H13M12 6V10M10 8H14" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path
        d="M19.4 15A1.7 1.7 0 0 0 20 17.2L18 20.6A1.7 1.7 0 0 0 15.7 20L14.8 19.5A1.7 1.7 0 0 0 12 21H8A1.7 1.7 0 0 0 6.3 19.5L5.4 20A1.7 1.7 0 0 0 3 17.2L3.6 15A1.7 1.7 0 0 0 2 12.5V9A1.7 1.7 0 0 0 3.6 7.3L3 5A1.7 1.7 0 0 0 5.4 2.8L6.3 3.3A1.7 1.7 0 0 0 8 2H12A1.7 1.7 0 0 0 14.8 3.3L15.7 2.8A1.7 1.7 0 0 0 18 5L17.4 7.3A1.7 1.7 0 0 0 19 9V12.5A1.7 1.7 0 0 0 19.4 15Z"
        transform="translate(1 1) scale(0.92)"
      />
    </svg>
  );
}

function ProductHighlights() {
  return (
    <section className={styles.section} aria-labelledby="highlights-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>A thoughtful approach</p>

          <h2 id="highlights-title" className={styles.title}>
            Built around the way clinics work.
          </h2>

          <p className={styles.description}>
            Healthcare operations have many moving parts. SamaRoot is being
            developed to bring essential workflows into one configurable
            platform.
          </p>
        </div>

        <div className={styles.grid}>
          {highlights.map((item) => (
            <article className={styles.card} key={item.number}>
              <div className={styles.cardTop}>
                <span className={styles.icon}>
                  <HighlightIcon type={item.icon} />
                </span>

                <span className={styles.number}>{item.number}</span>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>

              <p className={styles.cardDescription}>{item.description}</p>
            </article>
          ))}
        </div>

        <p className={styles.disclaimer}>
          SamaRoot is in development. Product capabilities may evolve as the
          platform progresses.
        </p>
      </div>
    </section>
  );
}

export default ProductHighlights;
