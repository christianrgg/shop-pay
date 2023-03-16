import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/signin.module.scss"
import {BiLeftArrowAlt} from "react-icons/bi"
import Link from 'next/link';
import { Form, Formik } from "formik";
import LoginInput from "../components/inputs/loginInput";

export default function signin() {
  return (
    <div>
      <Header country="Mexico"/>
        <div className={styles.login}>
          <div className={styles.login__container}>
            <div className={styles.login__header}>
              <div className={styles.back_svg}>
                <BiLeftArrowAlt/>
              </div>
              <span>
                We´d be happy to join us ! <Link href="">Go Store</Link>
              </span>
            </div>
            <div className={styles.login__form}>
              <h1>Sign in</h1>
              <p>
                Get access to one of the best Eshopping services in the world.
              </p>
              <Formik>
                {(form)=>(
                  <Form>
                    <LoginInput icon="email" placeholder="Email Address"/>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      <Footer country="Mexico"/>
    </div>
  )
}
