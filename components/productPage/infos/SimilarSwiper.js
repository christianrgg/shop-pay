import { simillar_products } from "../../../data/products"
import styles from "./styles.module.scss"
import Link from "next/link"
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function SimilarSwiper() {
  return (
    <Swiper
    slidesPerView={4}
    spaceBetween={5}
    slidesPerGroup={3}
    navigation={true}
    modules={[Navigation]}
    className="swiper similar_swiper products__swiper"
    breakpoints={{
        640: {
            width:640,
            slidesPerView:5,
        }
    }}
    >
        {simillar_products.map((p,i)=>(
            <SwiperSlide key={i}>
                <Link key={i} href="">
                    <img src={p} alt=""/>
                </Link>
            </SwiperSlide>
        ))}
    </Swiper>
  )
}
