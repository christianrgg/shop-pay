import styles from "./styles.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
        <ul>
            <li>
                <Link href="">Plus</Link>
            </li>
            <li>
                <Link href="">Cool Home Gadgets</Link>
            </li>
            <li>
                <Link href="">Super Deals</Link>
            </li>
            <li>
                <Link href="">New User Zone</Link>
            </li>
        </ul>
    </div>
  )
}
