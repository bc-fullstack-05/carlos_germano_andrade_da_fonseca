import Button from "../Button";
import styles from "../Hero/Hero.module.css";

const Hero = () => (
  <section >
    <div className={`container ${styles.containerHero}`}>
      <div  className={styles.background}/>
      <div className={styles.overlay}/>
      <h1 className={styles.heroText}>
        A história da música não pode ser esquecida!
      </h1>
      <p className={styles.heroParagraph}>
        Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil.
      </p>
      <div className={styles.containerButton}>
        <Button size="mid" color="blueButton">
          Inscrever-se
        </Button>
      </div>
    </div>
  </section>
);

export default Hero;
