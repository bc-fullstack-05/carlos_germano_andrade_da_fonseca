import styles from './Button.module.css'

export type Props = {
    children: string
    size?: 'mid'| 'large' | 'small' | 'buttonModal'
    color: 'greenButton'|'blueButton'|'blackButton'|'yellowButton'
    onClick?: () => void
}

const Button = ({children, size='small', color, onClick}: Props) =>{
    const buttonClass = `${styles.button} ${styles[size]} ${styles[color]}`;
    return (
        <button onClick={onClick} className={buttonClass}>{children}</button>
    )
}

export default Button
