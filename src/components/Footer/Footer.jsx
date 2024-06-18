import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import parkLogo from "../../assets/Private-parking-4-4-2024.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.fcontainer}>
        <div className={styles.fleftSection}>
          <div className={styles.flogoContainer}>
            <Link to="/">
              <img
                src={parkLogo}
                alt="Nimopais Kitchen"
                className={styles.flogo}
              />
            </Link>
          </div>
          <div className={styles.fcontainerdesc}>
            <p className={styles.fdescription}>
              Thank you for choosing our private parking app. Your convenience
              and security are our top priorities. Drive safely, park with ease,
              and enjoy seamless parking experiences with us. For any
              assistance, reach out to our support team.
            </p>
          </div>
        </div>

        <div className={styles.frightSection}>
          <div className={styles.flinksColumn}>
            <p className={styles.fpexploreadmin}>EXPLORE</p>

            <Link to="/About" className={styles.flink}>
              About
            </Link>
            <Link to="/contact" className={styles.flink}>
              Contact
            </Link>
            <Link to="/Career" className={styles.flink}>
              Our team
            </Link>
          </div>
        </div>
      </div>
      <p className={styles.fcopyRight}>
        &copy; 2024 Private Parking. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
