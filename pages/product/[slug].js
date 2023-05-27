import styles from "../../styles/product.module.scss"
import db from "../../utils/db"
import Product from "../../models/Product"
import Category from "../../models/Category"
import SubCategory from "../../models/Subcategory"
import User from "../../models/User"
import Head from "next/head"
import Header from "../../components/header"
import Footer from "../../components/footer"
import MainSwiper from "../../components/productPage/mainSwiper"
import { useState } from "react"
import Infos from "../../components/productPage/infos"
import Reviews from "../../components/productPage/reviews"

export default function ProductPage({product}) { 
    const [activeImg, setActiveImg] = useState("")   
    // console.log("Reviews", product.reviews);
    return (
    <>
        <Head>
            <title>{product.name}</title>
        </Head>
        <Header country=""/>
        <div className={styles.product}>
            <div className={styles.product__container}>
                <div className={styles.path}>
                Home / {product && product.category && product.category.name}
                {product && product.subCategories.map((sub, index) => (
                  <span key={index}>/{sub.name}</span>
                ))}
                    {/* Home / {product.category.name}
                    {product.subCategories.map((sub, index) =>(
                            <span key={index}>/{sub.name}</span>
                        ))
                    } */}
                </div>
                <div className={styles.product__main}>
                {product && product.images && (
                    <MainSwiper images={product.images} activeImg={activeImg}/>
                    )}
                    <Infos product={product} setActiveImg={setActiveImg}/>
                    {/* <MainSwiper images={product.images} activeImg={activeImg}/>
                    <Infos product={product} setActiveImg={setActiveImg}/> */}
                </div>
                <Reviews product={product}/>
            </div>
        <Footer country=""/>
        </div>
    </>
  )
}

// export async function getServerSideProps(context) {
//     const {query} = context;
//     const slug    = query.slug;
//     const style   = query.style || 0;
//     const size    = query.size || 0;
//     // console.log(slug, style, size);
//     db.connectDB();
//     //-------------
//     let product = await Product.findOne({slug})
//         .populate({path:"category", model:Category})
//         .populate({path:"subCategories._id", model:SubCategory, strictPopulate: false})
//         .populate({path:"reviews.reviewBy", model:User, strictPopulate: false})
//         .lean();
//     let subProduct = product?.subProducts?.[style];
//     let prices = subProduct?.sizes?.map((s) => s.price)?.sort((a, b) => a - b) || [];
//     // let subProduct = product?.subProducts?.[style];
//     // let prices = (subProduct?.sizes?.map((s)=>{
//     //     return s.price;
//     // }))
//     // .sort((a,b)=>{
//     //     return a - b;
//     // });

//     let newProduct = {
//         ...product,
//         style:parseInt(style),
//         images: subProduct?.images,
//         sizes: subProduct?.sizes,
//         discount: subProduct?.discount,
//         sku: subProduct?.sku,
//         colors: product?.subProducts?.map((p)=>{
//             return p.color;
//         }),
//         priceRange: subProduct?.discount 
//             ?`From ${(prices[0]-prices[0] / subProduct.discount).toFixed(2)} to ${
//                 (prices[prices.length-1] - 
//                 prices[prices.length-1] / subProduct.discount).toFixed(2)
//             }$` 
//             : `From ${prices[0]} to ${prices[prices.length-1]}$`,
//         price: subProduct?.discount> 0 
//         ? (subProduct?.sizes?.[size]?.price -
//           (subProduct?.sizes?.[size]?.price / subProduct.discount)).toFixed(2)
//         : subProduct?.sizes?.[size]?.price,
//         priceBefore: subProduct?.sizes?.[size]?.price,
//         quantity: subProduct?.sizes?.[size]?.qty,
//         ratings:[
//             {
//                 "percentage":76,
//             },
//             {
//                 "percentage":14,
//             },
//             {
//                 "percentage":6,
//             },
//             {
//                 "percentage":4,
//             },
//             {
//                 "percentage":0,
//             }
//         ],
//         allSizes: (product.subProducts.map((p)=>{
//             return p.sizes;
//         })).flat().sort((a,b)=>{
//             return a.size - b.size
//         }).filter((element,index,array)=>array.findIndex((el2)=>el2.size===element.size)=== index),
//     };
//     //-------------
//     db.disconnectDb();
//     return {
//         props: {
//             product: JSON.parse(JSON.stringify(newProduct))
//         },
//     }
// }
export async function getServerSideProps(context) {
    const { query } = context;
    const slug = query.slug;
    const style = parseInt(query.style) || 0;
    const size = query.size || 0;
  
    try {
      await db.connectDB(); // Conecta a la base de datos
  
      let product = await Product.findOne({ slug })
        .populate({ path: "category", model: Category })
        .populate({ path: "subCategories", model: SubCategory, strictPopulate: false })
        // .populate({ path: "subCategories._id", model: SubCategory, strictPopulate: false })
        .populate({ path: "reviews.reviewBy", model: User, strictPopulate: false })
        .lean();
  
    let activeStyle = Math.min(parseInt(style) || 0, (product.images && product.images.length > 0) ? product.images.length - 1 : 0);
      let subProduct = product?.subProducts?.[activeStyle];
      let prices = subProduct?.sizes?.map((s) => s.price)?.sort((a, b) => a - b) || [];
  
      let newProduct = {
        ...product,
        style: activeStyle,
        images: subProduct?.images,
        sizes: subProduct?.sizes,
        discount: subProduct?.discount,
        sku: subProduct?.sku,
        colors: product?.subProducts?.map((p) => {
          return p.color;
        }),
        priceRange: subProduct?.discount
          ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${
              (prices[prices.length - 1] - prices[prices.length - 1] / subProduct.discount).toFixed(2)
            }$`
          : `From ${prices[0]} to ${prices[prices.length - 1]}$`,
        price:
          subProduct?.discount > 0
            ? (subProduct?.sizes?.[size]?.price - (subProduct?.sizes?.[size]?.price / subProduct.discount)).toFixed(2)
            : subProduct?.sizes?.[size]?.price,
        priceBefore: subProduct?.sizes?.[size]?.price,
        quantity: subProduct?.sizes?.[size]?.qty,
        ratings: [
          {
            percentage: 76,
          },
          {
            percentage: 14,
          },
          {
            percentage: 6,
          },
          {
            percentage: 4,
          },
          {
            percentage: 0,
          },
        ],
        allSizes: product.subProducts
          .map((p) => {
            return p.sizes;
          })
          .flat()
          .sort((a, b) => {
            return a.size - b.size;
          })
          .filter((element, index, array) => array.findIndex((el2) => el2.size === element.size) === index),
      };
  
      return {
        props: {
          product: JSON.parse(JSON.stringify(newProduct)),
        },
      };
    } catch (error) {
      // Manejo de errores
    console.error("Error en getServerSideProps:", error);

    // Desconexión de la base de datos (en caso de error)
    await db.disconnectDb();

    // Puedes retornar un objeto con un error personalizado en caso de que ocurra un error en la obtención de datos
    return {
      props: {
        error: "Error al obtener los datos del producto",
      },
    };
  }
}
      