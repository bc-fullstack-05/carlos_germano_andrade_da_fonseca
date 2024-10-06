import { useEffect, useRef, useState } from "react";
import Album from "../Album";
import style from "./ListAlbums.module.css";
import Button from "../Button";
import { AlbumModel } from "../../models/albumModel";
import { album_api } from "../../services/apiService";
import { getLocalStorage } from "../../services/storage";
import { adjustFontSize } from "../../utils/textUtils";
import Search from "../Search";
import TitleSection from "../TitleSection";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ListAlbums = () => {
  const [modal, setModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumModel | null>(null);
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [initialData, setInitialData] = useState<AlbumModel[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  const {user} = useAuth()

  const openModal = (album: AlbumModel) => {
    setSelectedAlbum(album);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedAlbum(null);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const authData = getLocalStorage("auth_data");

        if (authData?.token) {
          album_api.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
        }

        const response = await album_api.get("/all", {
          params: { search: "rock" },
        });
        setAlbums(response.data);
        setInitialData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlbums();
  }, []);

async function  buyAlbum () {
  const body = {
    album: selectedAlbum,
    user_id: user?.id
  }
  try {
  const response = await album_api.post("/sale", body)
  toast.success("Compra realizada!", response.data);
    
  }catch (err) {
    console.log(err);
  }
}

  useEffect(() => {
    if (!isSearching) {
      const interval = setInterval(() => {
        if (carouselRef.current) {
          const carousel = carouselRef.current;

          if (
            carousel.scrollLeft + carousel.clientWidth >=
            carousel.scrollWidth
          ) {
            carousel.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          } else {
            carousel.scrollBy({
              left: 300,
              behavior: "smooth",
            });
          }
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isSearching]);

  return (
    <div className={`container`}>
      <Search
        setAlbums={setAlbums}
        initialData={initialData}
        setIsSearching={setIsSearching}
      />

      <TitleSection>Trends</TitleSection>

      {isSearching ? (
        <div className={style.containerList}>
          {albums.length > 0 ? (
            albums.map((item) => (
                <Album
                  key={item.id}
                  name={item.artists[0].name}
                  value={item.value}
                  image={item.images[0].url}
                  onClick={() => openModal(item)}
                />
            ))
          ) : (
            <p>Nenhum álbum encontrado</p>
          )}
        </div>
      ) : (
        <div className={style.carouselWrapper}>
          <div className={style.carousel} ref={carouselRef}>
            {albums.map((item) => (
              <Album
                key={item.id}
                name={item.artists[0].name}
                value={item.value}
                image={item.images[0].url}
                onClick={() => openModal(item)}
              />
            ))}
          </div>
        </div>
      )}

      {modal && selectedAlbum && (
        <div className={`${style.modal} ${modal ? style.visivel : ""}`}>
          <div className={style.modalContent}>
            <div className={style.content}>
              <div className={style.containerImg}>
                <div
                  style={{
                    background: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(${selectedAlbum.images[0].url})`,
                    backgroundSize: "cover",
                  }}
                  className={style.img}
                ></div>
              </div>
              <button className={style.close} onClick={closeModal}></button>
            </div>
            <div>
              <h3
                className={style.titleModal}
                style={{
                  fontSize: adjustFontSize(selectedAlbum.artists[0].name),
                }}
              >
                {selectedAlbum.artists[0].name}
              </h3>
              <div className={style.containerDetails}>
                <p className={style.p}>Album: {selectedAlbum.name}</p>
                <p className={style.p}>
                  Lançamento: {selectedAlbum.releaseDate}
                </p>
                <p className={style.p}>Valor: {selectedAlbum.value}</p>
              </div>
              <div className={style.button}>
                <Button onClick={buyAlbum} color="yellowButton" size="buttonModal">
                  Comprar
                </Button>
              </div>
            </div>
          </div>
          <div className={style.overlay} onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default ListAlbums;
