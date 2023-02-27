import styles from './styles.module.scss';
import Link from 'next/link';

export default function UserMenu({loggedIn}) {
  return (
    <div className={styles.menu}>
        <h4>Welcome to Shoppay!</h4>
        {loggedIn ? 

        <div className={styles.flex}>
            <img src='https://res.cloudinary.com/ddfzagwob/image/upload/v1668309130/582cbc77150627b3263358f82be5b44f_f533p4.png' alt="" className={styles.menu__img}/>
            <div className={styles.col}>
                <span>Welcome Back,</span>
                <h3>CRGG</h3>
                <span>Sign out</span>
            </div>
        </div>    
        : (
        <div className={styles.flex}>
            <button className={styles.btn_primary}>Register</button>
            <button className={styles.btn_outlined}>Login</button>
        </div>
        )}
        <ul>
            <li>
                <Link href="/profile">Account</Link>
            </li>
            <li>
                <Link href="/profile/orders">My orders</Link>
            </li>
            <li>
                <Link href="/profile/messages">Message Center</Link>
            </li>
            <li>
                <Link href="/profile/address">Addres</Link>
            </li>
            <li>
                <Link href="/profile/whishlist">Whishlist</Link>
            </li>
        </ul>
    </div>
  )
}
