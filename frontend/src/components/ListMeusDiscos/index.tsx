import Tag from "../Tag";
import TitleSection from "../TitleSection";
import style from "./ListMeusAlbums.module.css";
import iconeAlbum from "../../assets/file-video.png";
import iconeValor from "../../assets/dollar-sign.png";
import { useEffect, useState } from "react";
import Album from "../Album";
import { album_api } from "../../services/apiService";
import { useAuth } from "../../hooks/useAuth";
import { getLocalStorage } from "../../services/storage";

type Album = {
  id: string;
  name: string;
  value: number;
  artist_name: string;
  spotify_url: string;
  image_url: string;
};

const ListMeusDiscos = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [valor, setValor] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const authData = getLocalStorage("auth_data");

        if (authData?.token) {
          album_api.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
        }
        
        const response = await album_api.get(`/my-collection/${user?.id}`, {});
        setAlbums(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlbums();
  }, [user?.id]);

  useEffect(() => {
    const totalValue = albums.reduce((acc, album) => acc + album.value, 0);
    const totalAlbums = albums.length;

    setValor(totalValue);
    setTotal(totalAlbums);
  }, [albums]); 

  return (
    <div className={style.body}>
      <div className="container">
        <div className={style.content}>
          <TitleSection>Meus Discos</TitleSection>
          <div className={style.containerTags}>
            <Tag title="Total de Albums" valor={total} icone={iconeAlbum} />
            <Tag title="Valor Investido" valor={valor} icone={iconeValor} />
          </div>
          <div className={style.containerList}>
            {albums?.map((item) => (
              <Album
                key={item.id}
                name={item.name}
                value={item.value}
                image={item.image_url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMeusDiscos;
