import styles from './Select.module.css'

function Select({id, nome, name, value, onClick, onChange, options}) {
    return (
        <div>
            <select className={styles.select} name={name} onClick={onClick} value={value} onChange={onChange} id={id} required>
                <option value="">{nome}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.code}>
                            {option.name}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default Select