import IsakImg from "../assets/Jaguar F TYPE Luxury Sports Blue Car - 1280x559.png";
import SaeedImg from "../assets/Red Ferrari 458 Italia Sports Car - 1205x770.png";
import AtaImg from "../assets/Infiniti Essence Concept Sports Car - 1280x586.png";
import styles from "./Career.module.css";

function Career() {
  return (
    <div>
      <h1>Join our team...</h1>
      <h3></h3>

      <div className={styles.CareerContainer}>
        <div className={styles.Isak}>
          <img src={IsakImg} alt="Isak image" className={styles.SaeedImg} />
          <h2>Mr. Isak</h2>
          <p>
            As a developer, you'll contribute to creating seamless solutions
            that help users easily find parking spots, enhancing their overall
            enjoyment of the process. Join our dynamic team of developers and be
            at the forefront of crafting innovative solutions that revolutionize
            the way people experience urban mobility.
          </p>
        </div>

        <div className={styles.Saeed}>
          <img src={SaeedImg} alt="Saeed image" className={styles.IsakImg} />
          <h2>Mr. Saeed</h2>
          <p>
            As part of a creative team, I would say there is enough room to
            grow. For example, with the latest technology and cool events, we
            facilitate communication among all team members, including testing
            and supporting departments. So, if you're looking for new challenges
            and a multicultural company, please send us your updated CV.
          </p>
        </div>

        <div className={styles.Ata}>
          <img src={AtaImg} alt="Ata image" className={styles.AtaImg} />
          <h2>Mr. Ata</h2>
          <p>
            Join our dynamic team and explore endless opportunities for personal
            and professional growth. At our company, innovation is at the core
            of everything we do. From harnessing cutting-edge technology to
            hosting engaging events, we foster an environment where
            collaboration thrives across all departments. If you're seeking
            exciting challenges and crave the experience of being part of a
            diverse and vibrant workplace, we invite you to join our team.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Career;
