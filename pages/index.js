import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.scss';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { useSession, signIn, signOut } from "next-auth/react"
import Main from '../components/home/main';
import FlashDeals from '../components/home/flashDeals';
import Categoy from '../components/home/category';
import { women_accessories, women_dresses, women_shoes } from '../data/home';
import { useMediaQuery } from 'react-responsive';


const inter = Inter({ subsets: ['latin'] })

export default function Home({country}) {
  const { data: session } = useSession()
  // console.log(session);
  const isMedium = useMediaQuery({query:"(max-width:850px)"});
  const isMobile = useMediaQuery({query:"(max-width:550px)"});
  return (
    <>
      <Header country={country}/>
      <div className={styles.home}>
        <div className={styles.container}>
          <Main/>
          <FlashDeals/>
          <div className={styles.home__category}>
            <Categoy header="Dresses" products={women_dresses} background="#5a31f4"/>
            {!isMedium && ( <Categoy header="Shoes" products={women_shoes} background="#3c811f"/>)}
            {isMobile && ( <Categoy header="Shoes" products={women_shoes} background="#3c811f"/>)}
            <Categoy header="Accesories" products={women_accessories} background="#000"/>
          </div>
        </div>
      </div>
      <Footer country={country}/>
    </>
  );
}
export async function getServerSideProps(){
  let data = await axios
  // .get("https://api.ipregistry.co/?key=1i8mceb7ky4nhygy") esta es key correcta
  .get("https://api.ipregistry.co/?key=1i8mceb7ky4nhyg")
  .then((res) => {
    return res.data.location.country;
  })
  .catch((err) => {
    console.log(err);
  });
  return {
    props: {
      // country: {name: data.name, flag: data.flag.emojitwo },
      country: {name: "Mexico", flag: "https://res.cloudinary.com/ddfzagwob/image/upload/v1677296699/shoppay/mexico_d5fjyu.png"},
    }
  }
}

