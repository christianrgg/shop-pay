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
import { gamingSwiper, homeImprovSwiper, women_accessories, women_dresses, women_shoes, women_swiper } from '../data/home';
import { useMediaQuery } from 'react-responsive';
import ProductsSwipper from '../components/productsSwipper';
import db from "../utils/db";
import Product from '../models/Product';
import ProductCard from '../components/productCard';

const inter = Inter({ subsets: ['latin'] })

export default function Home({country, products}) {
  console.log("Products",products);
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
          <ProductsSwipper products={women_swiper} />
          <ProductsSwipper products={gamingSwiper} header="For Gamers" bg="#2f82ff"/>
          <ProductsSwipper products={homeImprovSwiper} header="House Improvement" bg="##ff8f84"/>
          <div className={styles.products}>
            {
              products.map((product)=>(
                <ProductCard product={product} key={product._id}/>
              ))
            }
          </div>
        </div>
      </div>
      <Footer country={country}/>
    </>
  );
}
export async function getServerSideProps(){
  db.connectDB();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  
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
      products: JSON.parse(JSON.stringify(products)),
      // country: {name: data.name, flag: data.flag.emojitwo },
      country: {name: "Mexico", flag: "https://res.cloudinary.com/ddfzagwob/image/upload/v1677296699/shoppay/mexico_d5fjyu.png"},
    }
  }
}

