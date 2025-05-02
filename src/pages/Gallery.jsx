import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import CountryFlag from "../components/CountryFlag";
import { thumbnailURL } from "../helper/thumnail-resize";

const API_URL = "https://projecttour-b58cf17beb2d.herokuapp.com/api/gallery";

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const groupedData = response.data.reduce((acc, item) => {
          const key = item.category_name;
          if (!acc[key]) {
            acc[key] = {
              name: item.category_name,
              nameth: item.category_name_th || item.category_name,
              emoji: item.emoji,
              images: [],
            };
          }
          acc[key].images.push(item.image_url);
          return acc;
        }, {});
        setGalleryData(Object.values(groupedData));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading gallery:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-[#FFFDF7] min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto font-baijam">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-yellow-400">
            แกลเลอรี่ความทรงจำ
          </h2>
          <p className="mt-2 text-gray-600 text-lg">
            รวมภาพบรรยากาศจากทั่วทุกมุมโลก
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <FaSpinner className="animate-spin text-yellow-600 text-3xl" />
            <span className="ml-3 text-yellow-600">กำลังโหลดภาพ...</span>
          </div>
        ) : (
          galleryData.map((country, index) => (
            <div key={index} className="mb-16">
              {/* Country Header */}
              <div className="flex items-center gap-3 mb-4">
                <CountryFlag countryCodes={country.emoji} />
                <h3 className="text-xl md:text-2xl font-semibold text-[#2F2F2F]">
                  {country.name} / {country.nameth}
                </h3>
              </div>

              <div className="h-1 w-24 bg-yellow-400 rounded-full mb-4" />

              {/* Gallery Images */}
              {country.images.length <= 4 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                  {country.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="overflow-hidden rounded-xl shadow-md group"
                    >
                      <img
                        src={thumbnailURL(img)}
                        alt={`${country.name} ${imgIndex + 1}`}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  spaceBetween={15}
                  breakpoints={{
                    320: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                >
                  {country.images.map((img, imgIndex) => (
                    <SwiperSlide key={imgIndex}>
                      <div className="overflow-hidden rounded-xl shadow-md group">
                        <img
                          src={thumbnailURL(img)}
                          alt={`${country.name} ${imgIndex + 1}`}
                          className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Gallery;
