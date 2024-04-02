import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import Container from './Container'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <ul className={styles.list}>
                    <li className={styles.home}>
                        <Link to="/">SuiteStore</Link>
                    </li>
                    <div className={styles.itens}>
                        <li className={styles.item}>
                            <Link to="/Products">Products</Link>
                        </li>
                        <li className={styles.item}>
                            <Link to="/Categories">Categories</Link>  
                        </li>
                        <li className={styles.item}>
                            <Link to="/History">History</Link>
                        </li>
                    </div>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar