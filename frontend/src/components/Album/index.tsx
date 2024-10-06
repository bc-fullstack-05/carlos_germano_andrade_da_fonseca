
import { adjustFontSize } from "../../utils/textUtils";
import style from "./Album.module.css";

type Props = {
  name: string
  value: number
  image: string
  onClick?: () => void
}

const Album = ({ onClick, name, value, image }: Props) => {


  const fontSize = adjustFontSize(name);

  return (
    <div
      style={{
        background: `
           linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)),
            url(${image})
          `,
        backgroundSize: "cover",
      }}
      className={style.card}
      onClick={onClick}>
      <div className={style.infos}>
        <div>
          <h4 className={style.title} style={{fontSize}}>{name}</h4>
        </div>
        <div>
          <p className={style.price}>R$ {value}</p>
        </div>
      </div>
    </div>
  );
};

export default Album;
