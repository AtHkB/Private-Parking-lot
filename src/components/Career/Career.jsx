import styles from "./Career.module.css";

function Career() {
  return (
    <div>
      <h1>Join our team...</h1>
      <h3></h3>

      <div className={styles.CareerContainer}>
        <div className={styles.Saeed}>
          <h2>Saeed</h2>
          <p>
            As part of a creative team, I would say there is enough room to
            grow. For example, with the latest technology and cool events, we
            facilitate communication among all team members, including testing
            and supporting departments. So, if you're looking for new challenges
            and a multicultural company, please send us your updated CV.
          </p>
        </div>

        <div className={styles.Ata}>
          <h2>Ata</h2>
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
