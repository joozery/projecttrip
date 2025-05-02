import herobg from "../../assets/herobg.jpg";
import rightImage from "../../assets/pngegg.png";
import { LuChevronRight } from "react-icons/lu";
import { FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${herobg})` }}
    >
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8EE]/90 via-white/80 to-transparent z-0" />

      {/* Parallax circle */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-100 rounded-full opacity-30 blur-2xl animate-pulse z-0" />
      <div className="absolute bottom-10 right-16 w-32 h-32 bg-teal-100 rounded-full opacity-20 blur-xl animate-ping z-0" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 md:px-16 h-full flex items-center justify-between flex-col md:flex-row">
        {/* Left text */}
        <motion.div
          className="w-full md:w-1/2 mt-32 md:mt-0 space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 text-sm text-teal-700 bg-teal-100 px-3 py-1 rounded-full font-medium w-fit shadow">
            <FaMapMarkedAlt />
            วางแผนทริปในฝันของคุณ
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#2F2F2F] leading-tight tracking-tight font-bai">
            สัมผัสมิติใหม่ของการ{" "}
            <span className="text-yellow-700">ท่องเที่ยว</span>
          </h1>
          <p className="text-gray-700 text-lg font-bai leading-relaxed max-w-xl">
            TourBU พร้อมพาคุณไปเก็บความทรงจำอันล้ำค่าทั้งในและต่างประเทศ
            เราคัดสรรแพ็กเกจท่องเที่ยวที่ไม่เหมือนใคร
            เพื่อประสบการณ์ที่คุณจะไม่มีวันลืม
          </p>

          <div className="flex gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window.location.href = "/Trips")}
              className="px-6 py-3 flex items-center gap-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition shadow-lg"
            >
              วางแผนทริปเลย <LuChevronRight className="text-xl" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => (window.location.href = "/Gallery")}
              className="px-6 py-3 border border-yellow-600 text-yellow-800 rounded-full hover:bg-yellow-100 transition"
            >
              ดูภาพบรรยากาศ
            </motion.button>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: [0, -10, 0], opacity: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={rightImage}
            alt="TourBU Experience"
            className="w-[340px] md:w-[500px] drop-shadow-2xl object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
