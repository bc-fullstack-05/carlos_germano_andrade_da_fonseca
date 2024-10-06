import style from './Input.module.css'

type Props = {
    title: string,
    off?: boolean
    value?: number | string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({title, off, value, onChange}: Props) => {
    return (
        <div className="container">
            <div className={style.container}>
                <label className={style.label} htmlFor="number">{title}:</label>
                <input min={0} onChange={onChange} value={value} disabled={off} className={style.input} type="number" />
            </div>
        </div>
    )
}

export default Input