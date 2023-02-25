import Image from 'next/image';
import styles from './styles.module.scss';
import {MdSecurity} from 'react-icons/md';
import {BsSuitHeart} from 'react-icons/bs';
import {RiAccountPinCircleLine, RiArrowDropDownFill} from 'react-icons/ri';
import Link from 'next/link';

export default function Top() {
  return (
    <div className={styles.top}>
        <div className={styles.top__container}>
            <div></div>
            <ul className={styles.top__list}>
                <li>
                  <img src='https://res.cloudinary.com/ddfzagwob/image/upload/v1677296699/shoppay/mexico_d5fjyu.png'/>
                  <span>Mexico / mxn</span>
                </li>
                <li>
                  <MdSecurity/>
                  <span>Buyer Protection</span>
                </li>
                <li>
                  <span>Customer Service</span>
                </li>
                <li>
                  <span>Help</span>
                </li>
                <li>
                  <BsSuitHeart/>
                  <Link href="/profile/whishlist">
                  <span>Wishlist</span>
                  </Link>
                </li>
                <li>
                  <div className={styles.flex}>
                    <RiAccountPinCircleLine/>
                    <span>Account</span>
                    <RiArrowDropDownFill/>
                  </div>
                </li>
            </ul>
        </div>
    </div>
  )
}
