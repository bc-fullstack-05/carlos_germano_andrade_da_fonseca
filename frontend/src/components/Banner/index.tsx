import style from "../Banner/Banner.module.css";

const Banner = () => (
  <div className={style.bannerContainer}>
    <div className={style.background} />
    <div className={style.overlay} />
    <h2 className={style.title} >A história da música não pode ser esquecida!</h2>
    <p className={style.p}>Sucessos que marcaram o tempo!!!</p>
  </div>
);

export default Banner;
