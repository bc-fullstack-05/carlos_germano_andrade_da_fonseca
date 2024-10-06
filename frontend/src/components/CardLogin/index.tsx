import logo from "../../assets/Logo.png";
import Button from "../Button";
import toast from "react-hot-toast";

import styles from "./CardLogin.module.css";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const CardLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, setIsLoading } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Acessando sua conta...");
    try {
      await login(email, password);
      setLoading(false);
      toast.dismiss(toastId);
      toast.success("Login feito com sucesso!");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.error("Algo deu errado!");
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.overlay} />
      <div className={styles.cardContainer}>
        <Link to={"/"}>
          <img className={styles.img} src={logo} alt="Logo BootPlay" />
        </Link>
        <h2 className={styles.title}>Acesse sua conta</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className={styles.label} htmlFor="password">
            Senha
          </label>
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {loading ? (
            <div className={styles.button}>
              <Button color="blackButton" size="large">
                Carregando
              </Button>
            </div>
          ) : (
            <div className={styles.button}>
              <Button color="blackButton" size="large">
                Entrar
              </Button>
            </div>
          )}
        </form>
        <p className={styles.p}>
          Ainda não tem uma conta ?{" "}
          <Link to={"/register"}>
            <span className={styles.span}>Inscrever-se</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CardLogin;