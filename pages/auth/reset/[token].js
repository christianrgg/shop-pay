import styles from "../../../styles/forgot.module.scss";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Link from 'next/link';
import {BiLeftArrowAlt} from "react-icons/bi"
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "/components/inputs/loginInput";
import CircledIconBtn from "/components/Buttons/circledIconBtn";
import { useState } from "react";
import axios from "axios";
import DotLoaderSpinner from "../../../components/loaders/dotLoader/index"

export default function reset({token}) {
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const passwordValidation=Yup.object({
    password: Yup.string()
    .required("Please enter your new password.")
    .min(6, "Password must be at least 6 characters.")
    .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
    .required("Confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const resetHandler=async()=>{
    try {
      setLoading(true)
      setLoading(false);
      setError("");
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
              Reset your password ? <Link href="/">Login instead</Link>
            </span>
          </div>
              <Formik
              enableReinitialize
              initialValues={{
                password, conf_password,
              }}
              validationSchema = {passwordValidation}
              onSubmit={()=>{
                resetHandler();
              }}
              >
                {(form)=>(
                  <Form>
                    <LoginInput 
                    type = "password"
                    name = "password"
                    icon = "password" 
                    placeholder = "Password"
                    onChange = {(e)=>setPassword(e.target.value)}
                    />
                    <LoginInput 
                    type = "password"
                    name = "conf_password"
                    icon = "password" 
                    placeholder = "Confirm Password"
                    onChange = {(e)=>setConf_password(e.target.value)}
                    />
                    <CircledIconBtn type="submit" text="Submit"/>
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

export async function getServerSideProps(context){
    const { query } = context;
    const token = query.token

    return {
        props:{

        }
    }
}