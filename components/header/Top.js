import styles from './styles.module.scss';
import {MdSecurity} from 'react-icons/md';
import {BsSuitHeart} from 'react-icons/bs';
import {RiAccountPinCircleLine, RiArrowDropDownFill} from 'react-icons/ri';
import Link from 'next/link';
import { use, useState } from 'react';
import UserMenu from './UserMenu';

export default function Top() {
  const[loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false)
  return (
    <div className={styles.top}>
        <div className={styles.top__container}>
            <div></div>
            <ul className={styles.top__list}>
                <li className={styles.li}>
                  <img src='https://res.cloudinary.com/ddfzagwob/image/upload/v1677296699/shoppay/mexico_d5fjyu.png'/>
                  <span>Mexico / mxn</span>
                </li>
                <li className={styles.li}>
                  <MdSecurity/>
                  <span>Buyer Protection</span>
                </li>
                <li className={styles.li}>
                  <span>Customer Service</span>
                </li>
                <li className={styles.li}>
                  <span>Help</span>
                </li>
                <li className={styles.li}>
                  <BsSuitHeart/>
                  <Link href="/profile/whishlist">
                  <span>Wishlist</span>
                  </Link>
                </li>
                <li className={styles.li}
                onMouseOver={()=> setVisible(true)}
                onMouseLeave={()=> setVisible(false)}
                >
                {
                  loggedIn ? ( 
                  <li className={styles.li}>
                  <div className={styles.flex}>
                    <img src='https://res.cloudinary.com/ddfzagwob/image/upload/v1668309130/582cbc77150627b3263358f82be5b44f_f533p4.png' alt=""/>
                    <span>Christian</span>
                    <RiArrowDropDownFill/>
                  </div>
                </li> 
                ) : (
                  <li className={styles.li}>
                  <div className={styles.flex}>
                    <RiAccountPinCircleLine/>
                    <span>Account</span>
                    <RiArrowDropDownFill/>
                  </div>
                  </li> 
                )}
                { visible && <UserMenu loggedIn={loggedIn}/> }
                
                </li>
            </ul>
        </div>
    </div>
  )
}
