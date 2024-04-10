import styles from "./Footer.module.css";
import { FaInstagram, FaYoutube, FaPinterest, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import parkLogo from "../assets/Private-parking-4-4-2024 (1).png";

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vestibulum pretium vestibulum. Nullam lobortis euismod purus, eget
              accumsan quam faucibus ac.
            </p>
          </div>
        </div>
        <div className={styles.fsocialIcons}>
          <a href="https://www.instagram.com/" className={styles.fsocialIcon}>
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/" className={styles.fsocialIcon}>
            <FaYoutube />
          </a>
          <a href="https://www.pinterest.com/" className={styles.fsocialIcon}>
            <FaPinterest />
          </a>
          <a
            href="https://twitter.com/?lang=en-gb"
            className={styles.fsocialIcon}
          >
            <FaTwitter />
          </a>
        </div>
        <div className={styles.frightSection}>
          <div className={styles.flinksColumn}>
            <p className={styles.fpexploreadmin}>EXPLORE</p>

            <Link to="/About" className={styles.flink}>
              {" "}
              About
            </Link>
            <Link to="/contact" className={styles.flink}>
              {" "}
              Contact
            </Link>
          </div>
          <div className={styles.flinksColumn}>
            <p className={styles.fpexploreadmin}>ADMIN</p>
            <a href="#" className={styles.flink}>
              Style guide
            </a>
            <a href="#" className={styles.flink}>
              Licenses
            </a>
            <a href="#" className={styles.flink}>
              Instructions
            </a>
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
