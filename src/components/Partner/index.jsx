import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import axios from "axios";

const Partner = () => {
  const [partners, setPartners] = useState([]);

  const GetPartner = async () => {
    try {
      const response = await axios.get(
        "https://projecttour-b58cf17beb2d.herokuapp.com/api/partners"
      );
      setPartners(response.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    GetPartner();
  }, []);

  return (
    <section className="py-16 bg-[#FDF8EE] relative">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-4">
          พาร์ทเนอร์ของเรา
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          เราภูมิใจที่ได้ร่วมงานกับพาร์ทเนอร์มากมายที่เชื่อมั่นในคุณภาพบริการของ TourBU
        </p>

        <div className="relative">
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            keyboard={true}
            mousewheel={true}
            modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition hover:scale-105 duration-300 flex items-center justify-center h-[140px]">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full max-h-[100px] object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#FDF8EE] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#FDF8EE] to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Partner;
