import styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brandSection}>
            <a href="/" className={styles.brand} aria-label="SamaRoot home">
              <img
                src="/samaroot-logo-white.svg"
                alt="SamaRoot"
                width="190"
                height="54"
              />
            </a>

            <p className={styles.tagline}>Smarter Care. Better Outcomes.</p>

            <p className={styles.description}>
              Building a configurable healthcare management platform designed
              around clinic operations.
            </p>
          </div>

          <nav className={styles.navigation} aria-label="Footer navigation">
            <h2 className={styles.heading}>Explore</h2>

            <a href="#highlights-title">Platform overview</a>
            <a href="#contact">Contact us</a>
          </nav>

          <div className={styles.contact}>
            <h2 className={styles.heading}>Get in touch</h2>

            <p>Interested in SamaRoot or want to learn more?</p>

            <a href="#contact" className={styles.contactLink}>
              Send an enquiry
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} SamaRoot. All rights reserved.</p>

          <p className={styles.status}>
            <span aria-hidden="true" />
            Platform in development
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
