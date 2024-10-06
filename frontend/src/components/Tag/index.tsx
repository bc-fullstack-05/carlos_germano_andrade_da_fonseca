import style from './Tag.module.css'

type Props = {
    icone: string
    title: string
    valor: number
}

const Tag = ({icone, title, valor}: Props) => {

    
    return (
        <div className={style.card}>
                <div className={style.content}>
                <div className={style.icone} style={{backgroundImage: `url(${icone})`}}></div>
                    <p>{title}</p>
                    <p className={style.value}>{valor}</p>
                    </div>
                </div>
    )
}

export default Tag