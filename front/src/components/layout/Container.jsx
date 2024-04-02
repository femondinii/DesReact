import styles from './Container.module.css'

function Container(props) {
    return (
        <div className={`${styles.item} ${styles[props.customClass]}`}>
            {props.children}
        </div>
    )
}

export default Container