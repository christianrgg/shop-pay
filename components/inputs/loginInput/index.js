import { BiUser } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";
import styles from "./styles.module.scss";

export default function LoginInput( {icon, placeholder} ) {
  return (
    <div className={styles.input}>
        { icon =="user" ? (
        <BiUser/>
        ) : icon =="email" ? ( 
        <SiMinutemailer/> 
        ) : icon=="password" ? (
        <IoKeyOutline/>
        ): ( 
        ""
        )}
        <input type="text" placeholder={placeholder}/>
    </div>
  )
}
