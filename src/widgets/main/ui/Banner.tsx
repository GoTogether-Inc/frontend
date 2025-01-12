import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

type BannerProps = {
  images: { img: string; link?: string }[];
  interval?: number;
};

const Banner = ({ images, interval = 3000 }: BannerProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="relative my-1 overflow-hidden sm:h-32 md:h-36 lg:h-40 rounded-xl">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: interval,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)} // 현재 활성 슬라이드 인덱스 업데이트
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <a href={image.link || '#'} target="_blank" rel="noopener noreferrer" className="w-full h-full">
              <img src={image.img} alt={`Slide ${index + 1}`} className="object-cover w-full h-full" />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 현재 슬라이드 위치 표시 */}
      <div className="absolute z-10 px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded bottom-2.5 right-2.5">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Banner;
