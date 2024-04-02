import styles from './Input.module.css'

function Inputs({type, id, name, inputStyle, placeholder, value, disabled, onChange}) {
    return (
        <div>
            <input name={name} className={`${styles.inside} ${styles[inputStyle]}`} value={value} type={type} id={id} placeholder={placeholder} onChange={onChange} disabled={disabled} required/>
        </div>
    )
}

export default Inputs