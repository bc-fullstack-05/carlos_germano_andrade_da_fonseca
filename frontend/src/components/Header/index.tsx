import { Link } from "react-router-dom";
import logo from "../../assets/logo-boot-play.png";
import Button from "../Button";
import styles from "./Header.module.css";
const Header = () => (
  <header className={styles.header}>
    <div className="container">
      <div className={styles.containerHeader}>
        <img className={styles.img} src={logo} alt="Logo BootPlay" />
        <div>
          <Link to={"/login"}>
            <Button color="blackButton">Entrar</Button>
          </Link>
          <Link to={'/register'}>
            <Button color="blueButton">Inscrever-se</Button>
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
