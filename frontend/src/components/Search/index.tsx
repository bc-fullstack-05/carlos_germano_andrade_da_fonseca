import { ChangeEvent, useState } from "react";
import icon from "../../assets/search.png";
import style from './Search.module.css';
import { AlbumModel } from "../../models/albumModel";
import { album_api } from "../../services/apiService";
import toast from "react-hot-toast";

interface SearchProps {
  setAlbums: (albums: AlbumModel[]) => void;
  initialData: AlbumModel[];
  setIsSearching: (isSearching: boolean) => void;
}

const Search = ({ setAlbums, initialData, setIsSearching }: SearchProps) => {
  const [input, setInput] = useState('');

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInput(value);

    if (value.trim().length === 0) {
      setAlbums(initialData);
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  }

  async function searchAlbum() {
    console.log("Realizando busca para:", input);
    
    if (input.trim().length === 0) {
      setAlbums(initialData);
      setIsSearching(false);
      return;
    }

    try {
      const response = await album_api.get(`/all`, { params: { search: input } });
      console.log("Resultados da pesquisa:", response.data);
      setAlbums(response.data);
    } catch (error) {
      toast.error("Erro ao buscar álbuns: " + error);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      searchAlbum();
    }
  }

  function handleBlur() {
    searchAlbum();
  }

  return (
    <div className={style.container}>
      <div className={style.search}>
        <input
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur} 
          className={style.input}
          type="search"
          placeholder="Pesquisar albums"
        />
        <img
          onClick={searchAlbum} 
          className={style.icon}
          src={icon}
          alt="Ícone lupa"
        />
      </div>
    </div>
  );
};

export default Search;
