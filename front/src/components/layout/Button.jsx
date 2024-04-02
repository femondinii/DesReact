import styles from "./Button.module.css"

function Button({id, value, buttonStyle, code, onChange, onClick}) {
    return (
        <div>
            <button code={code} onChange={onChange} className={`${styles.add} ${styles[buttonStyle]}`} type="submit" id={id} onClick={onClick}>{value}</button>
        </div>
    )
}

export default Button
