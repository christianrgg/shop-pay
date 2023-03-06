import styles from './styles.module.scss';

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
        <h3>WE ACCEPT</h3>
        <div className={styles.footer__flexwrap}>
            <img src="../../images/payment/visa.webp" alt=''/>
            <img src="../../../images/payment/american_express.webp" alt=''/>
            <img src="../../../images/payment/cb.webp" alt=''/>
            <img src="../../../images/payment/jcb.webp" alt=''/>
            <img src="../../../images/payment/maestro.webp" alt=''/>
            <img src="../../../images/payment/mastercard.webp" alt=''/>
            <img src="../../../images/payment/paypal.webp" alt=''/>
        </div>
    </div>
  )
}
