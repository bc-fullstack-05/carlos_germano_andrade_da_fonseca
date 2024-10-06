import style from './TitleSection.module.css'

type Props = {
    children: string
}

const TitleSection = ({children}: Props) => (
    <h2 className={style.title}>{children}</h2>
)

export default TitleSection