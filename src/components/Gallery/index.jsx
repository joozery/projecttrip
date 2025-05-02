import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { LuImages } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ImageGallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const MIN_IMAGES = 12;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(
          "https://projecttour-b58cf17beb2d.herokuapp.com/api/gallery"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          const imageUrls = data.map((item) => item.image_url);
          setImages(fillImages(imageUrls, MIN_IMAGES));
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const fillImages = (originalImages, minCount) => {
    if (originalImages.length >= minCount) return originalImages;
    let newImages = [...originalImages];
    while (newImages.length < minCount) {
      newImages = [...newImages, ...originalImages].slice(0, minCount);
    }
    return newImages;
  };

  return (
    <section className="py-16 bg-gradient-to-b  to-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-800">
            แกลเลอรี่ภาพความประทับใจ
          </h2>
          <button
            onClick={() => navigate("/Gallery")}
            className="flex items-center gap-2 text-sm md:text-base px-4 py-2 rounded-full border border-yellow-600 text-yellow-800 bg-yellow-100 hover:scale-105 transition font-semibold"
          >
            ดูทั้งหมด <LuImages />
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">กำลังโหลด...</p>
        ) : images.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1.5 },
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
            }}
            className="gallery-swiper"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="rounded-2xl overflow-hidden shadow-lg group relative">
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-[180px] object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-400">ไม่มีรูปภาพในแกลเลอรี่</p>
        )}
      </div>
    </section>
  );
};

export default ImageGallery;
