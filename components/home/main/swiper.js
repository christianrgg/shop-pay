import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mainSwiper"
      >
        {
            [...Array(10).keys()].map((i)=>(
                <SwiperSlide key={i}>
                <img src={`../../../images/swiper/${i+1}.jpg`} alt=""/>
                </SwiperSlide>
            ))
        }
        
        
       
      </Swiper>
    </>
  );
}

