import styles from "./About.module.css";
import backgroundPic from "../assets/new2.jpg";
import icon from "../assets/logoblue.png";

const About = () => {
  return (
    <div className={`${styles.container}`}>
      <div
        className={styles.backgroundPic}
        style={{
          backgroundImage: `url(${backgroundPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          position: "absolute",
          width: "100%",
          zIndex: "-1",
          /*  opacity: "0.5", */
        }}
      ></div>
      <div className={`${styles.head}`}>
        <h1 className={`${styles.title}`}>About us</h1>
        <div className={`${styles.descriptionContainer}`}>
          <img src={icon} alt="Icon" className={`${styles.icon}`} />
          <p className={`${styles.description}`}>
            Welcome to PrivateParking, where the world of parking meets digital
            innovation, brought to you by the dynamic trio: Mr. Saeed, Mr. Ata,
            and Mr. Isak. <br /> With their blend of entrepreneurial spirit and
            tech savvy, they&apos;ve transformed the parking landscape, making
            it easier than ever to find or rent that perfect spot. Meet the
            brains behind the scenes: Ata, the visionary navigator of our
            parking revolution; Saeed, the logistical genius who ensures smooth
            operations; and Isak, the coding virtuoso who brings our platform to
            life. <br />
            <br /> At PrivateParking, we&apos;re more than just a parking
            solution - we&apos;re a community of drivers and space owners coming
            together to solve a common challenge. Whether you&apos;re a space
            owner looking to maximize your asset or a driver in need of
            convenient parking, we&apos;ve got you covered. Join us on our
            journey as we redefine urban mobility, one parking spot at a time.
            <br />
            <br /> Get ready to park smarter, drive happier, and experience the
            future of parking with PrivateParking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
