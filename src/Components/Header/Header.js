import styles from './Header.module.css';

const Header = () => {
    return <span onClick={() => { window.scroll(0, 0) }} className={styles.header}>The Movie Hub</span>
}

export default Header;

