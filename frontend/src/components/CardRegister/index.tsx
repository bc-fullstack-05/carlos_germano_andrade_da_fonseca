import { FormEvent, useState } from "react";
import logo from "../../assets/Logo.png";
import Button from "../Button";
import toast from "react-hot-toast";
import { User } from "../../models/userModel";
import { api, getHeaders } from "../../services/apiService";
import styles from "../CardLogin/CardLogin.module.css";
import { Link, useNavigate } from "react-router-dom";

const CardRegister = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignUp = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Criando conta...");
    const data: User = {
      email: email,
      name: name,
      password: password,
    };

    api
      .post("/users/signUp", JSON.stringify(data), getHeaders())
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        toast.dismiss(toastId);
        toast.success("Usuário cadastrado com sucesso!");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.dismiss(toastId);
        toast.error("Algo deu errado!");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.overlay} />
      <div className={styles.cardContainer}>
        <Link to={"/"}>
          <img className={styles.img} src={logo} alt="Logo BootPlay" />
        </Link>
        <h2 className={styles.title}>Criar conta</h2>
        <form className={styles.form} onSubmit={handleSignUp}>
          <label className={styles.label} htmlFor="name">
            Nome Completo
          </label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <div className={styles.button}>
            {loading ? (
              <Button color="blackButton" size="large">
                Carregando
              </Button>
            ) : (
              <Button color="blackButton" size="large">
                Criar conta
              </Button>
            )}
          </div>
        </form>
        <p className={styles.p}>
          Já tem uma conta?{" "}
          <Link to={"/login"}>
            <span className={styles.span}>Entrar</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CardRegister;
