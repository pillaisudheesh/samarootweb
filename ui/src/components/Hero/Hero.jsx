import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.statusDot} aria-hidden="true" />A new chapter
          in clinic management
        </p>

        <h1 id="hero-title" className={styles.title}>
          Smarter Clinic Management.
          <span> Better Patient Care.</span>
        </h1>

        <p className={styles.description}>
          We are building SamaRoot, a configurable healthcare management
          platform designed to bring clinic operations together in one connected
          workspace.
        </p>

        <div className={styles.actions}>
          <a className={styles.primaryButton} href="#contact">
            Get in touch
            <span aria-hidden="true"> →</span>
          </a>

          <span className={styles.comingSoon}>
            <span aria-hidden="true">✦</span>
            Coming soon
          </span>
        </div>

        <p className={styles.note}>Smarter Care. Better Outcomes.</p>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.orbit} />
        <div className={styles.orbitInner} />

        <div className={styles.brandMark}>
          <img src="/samaroot-icon.svg" alt="" />
        </div>

        <div className={`${styles.floatingCard} ${styles.cardTop}`}>
          <span className={styles.cardIcon}>+</span>
          <span>
            <strong>Connected workflows</strong>
            <small>Designed around clinic operations</small>
          </span>
        </div>

        <div className={`${styles.floatingCard} ${styles.cardBottom}`}>
          <span className={styles.cardIcon}>✓</span>
          <span>
            <strong>Configurable platform</strong>
            <small>Built to adapt to clinic needs</small>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
