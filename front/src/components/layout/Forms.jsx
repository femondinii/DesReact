import styles from './Forms.module.css'

function Forms(props){
    return (
        <div className={styles.forms}>
            <form>
                {props.children}
            </form>
        </div>
    )
}

export default Forms