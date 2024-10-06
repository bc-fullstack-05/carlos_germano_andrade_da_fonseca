import Header from "../../components/Header";
import Hero from "../../components/Hero";
import styles from "../../components/Hero/Hero.module.css";

const Inicial = () => (
  <div className={styles.heroBackground}>
    <Header />
    <Hero />
  </div>
);

export default Inicial;
