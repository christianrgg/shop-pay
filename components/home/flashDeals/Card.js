import Link from "next/link";
import styles from "./styles.module.scss";

export default function FlashCard({product}) {
  return (
    <div className={styles.card}>
        <div className={styles.card__img}>
            <Link href={product.link}>
                <img src={product.image} alt=""/>
            </Link>
        </div>
    </div>
  )
}
