import logo from "../../assets/logo-boot-play.png";
import styles from "../Header/Header.module.css";
import stylesLogin from "./HeaderLogin.module.css";
import icon from "../../assets/icon.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  backgroundColor: "transparent" | "gray";
};

const HeaderLogin = ({ backgroundColor }: Props) => {
    const auth = useAuth();
  const headerClass = `${styles.header} ${stylesLogin[backgroundColor]}`;
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <header className={headerClass}>
      <div className="container">
        <div className={styles.containerHeader}>
          <Link to={"/dashboard"}>
            <img className={styles.img} src={logo} alt="Logo BootPlay" />
          </Link>
          <div className={stylesLogin.container}>
            <Link to={"/meusDiscos"} className={stylesLogin.link}>
              Meus Discos
            </Link>
            <Link to={"/carteira"} className={stylesLogin.link}>
              Carteira
            </Link>
            <div onClick={toggleDropdown} className={`${styles.img} ${stylesLogin.img}`}>
              <img src={icon} alt="Menu Icon" />
            </div>

            {isDropdownOpen && (
              <div className={stylesLogin.dropdown}>
                <Link onClick={auth.logout} to={"/"} className={stylesLogin.dropdownLink}>
                  Sair
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLogin;
