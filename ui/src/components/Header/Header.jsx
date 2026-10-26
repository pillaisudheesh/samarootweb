import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand} aria-label="SamaRoot home">
        <img
          src="/samaroot-logo-white.svg"
          alt="SamaRoot — Smarter Care. Better Outcomes."
          className={styles.logo}
          width="190"
          height="54"
        />
      </a>

      <a className={styles.contactLink} href="#contact">
        Contact us
        <span aria-hidden="true"> ↗</span>
      </a>
    </header>
  );
}

export default Header;
