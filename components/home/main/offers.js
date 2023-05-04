import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import { offersArray } from "../../../data/home";
import Link from "next/link";


export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersArray.map((offer, i)=>(
        <SwiperSlide key={i}>
          <Link href="">
            <img src={offer.image} alt=""/>
          </Link>
          <span>${offer.price}</span>
          <span>-{offer.discount}%</span>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

