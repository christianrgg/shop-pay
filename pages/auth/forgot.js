import styles from "../../styles/forgot.module.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from 'next/link';
import {BiLeftArrowAlt} from "react-icons/bi"
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "/components/inputs/loginInput";
import CircledIconBtn from "/components/Buttons/circledIconBtn";
import { useState } from "react";
import axios from "axios";
import DotLoaderSpinner from "../../components/loaders/dotLoader/index"

export default function forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [messages, setMessages] = useState([]);
  const emailValidation=Yup.object({
    email: Yup.string()
    .required("You'll need this when you log in and if you ever need to reset your password.")
    .email("Enter a valid email address."),
  })
  const forgotHandler=async()=>{
    try {
      setLoading(true)
      const {data} = await axios.post("/api/auth/forgot", {
        email,
      });
      setLoading(false);
      setError("");
      setSuccess(data.message)
      setEmail("");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
    {
        loading && <DotLoaderSpinner loading={loading}/>
      }
      <Header country=""/>
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt/>
            </div>
            <span>
              Forgot your password ? <Link href="">Login instead</Link>
            </span>
          </div>
              <Formik
              enableReinitialize
              initialValues={{
                email,
              }}
              validationSchema = {emailValidation}
              onSubmit={()=>{
                forgotHandler();
              }}
              >
                {(form)=>(
                  <Form>
                    <LoginInput 
                    type = "text"
                    name = "email"
                    icon = "email" 
                    placeholder = "Email Address"
                    onChange = {(e)=>setEmail(e.target.value)}
                    />
                    <CircledIconBtn type="submit" text="Send link"/>
                    <div style={{marginTop: "10px"}}>
                    { error && (<span className={styles.error}>{error}</span>)}
                    { success && (<span className={styles.success}>{success}</span>)}
                    </div>
                  </Form>
                )}
               
              </Formik>
            </div>
        </div>
      <Footer country=""/>
    </>
  )
}
