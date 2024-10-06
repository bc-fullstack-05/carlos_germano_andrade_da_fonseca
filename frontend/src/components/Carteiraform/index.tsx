import Input from "../Input";
import style from "./CarteiraForm.module.css";
import styleCard from "../Tag/Tag.module.css";
import Button from "../Button";
import { api } from "../../services/apiService";
import { getLocalStorage } from "../../services/storage";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import TitleSection from "../TitleSection";
import toast from "react-hot-toast";

const CarteiraForm = () => {
  const { user } = useAuth();
  const [credit, setCredit] = useState<number>(0);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredit(Number(event.target.value));
  };

  const buyCredit = async () => {
    try {
      const authData = getLocalStorage("auth_data");
      if (authData?.token) {
        api.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
      }

      const data = {
        credit,
        wallet_id: user?.wallet_id,
      };

      const response = await api.post(`/wallet/credit`, data);
      toast.success("Crédito adicionado", response.data)

      fetchWalletBalance(); 
    } catch (error) {
      console.error( error);
    }
  };

  const fetchWalletBalance = async () => {
    setLoading(true);
    try {
      if (user?.wallet_id) {
        const response = await api.get(`/wallet/${user?.wallet_id}`);
        setWalletBalance(response.data.balance); 
      }
    } catch (error) {
      console.error("Erro ao buscar saldo da carteira:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.wallet_id) {
      fetchWalletBalance();
    }
  }, [user?.wallet_id]);

  return (
    <div className="container">
      <div className={style.container}>
        <TitleSection>Carteira</TitleSection>
        <div className={style.content}>
          <div className={styleCard.card}>
            <div className={style.content}>
              <div>
                <Input title="Adicionar Créditos" onChange={handleInputChange} />
                <div className={style.button}>
                  <Button color="blueButton" size="small" onClick={buyCredit}>
                    Comprar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styleCard.card}>
            {loading ? (
              <Input value="Carregando..." off title="Valor da Carteira" />
            ) : (
              <Input value={walletBalance !== null ? walletBalance : 0} off title="Valor da Carteira" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteiraForm;
