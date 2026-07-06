import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getBanners } from "../api/bannerApi";

const Banners = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });

  if (isLoading) return <h1 className="text-center text-red-600 text-3xl font-bold"> Loading.... </h1>
  if (error) return <h1 className="text-center text-red-600 text-3xl font-bold"> Xatolik yuz berdi </h1>

  return (
    <div className="w-full h-[500px]">
      <Swiper className="h-full"
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}>

        {data.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />

              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
                <h1 className="text-5xl font-bold mb-4"> {banner.title} </h1>
                <p className="text-xl mb-6 font-bold"> {banner.subtitle} </p>
                <button className="bg-black px-6 py-3 rounded-lg font-bold border-4 border-white hover:text-red-600 hover:border-red-600 active:text-green-600 active:border-green-600 text-[18px]"> {banner.ctaText} </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Banners;