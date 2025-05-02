import { FaFacebookF, FaInstagram, FaLine, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#ffffff] text-gray-800 pt-16 pb-8 border-t border-yellow-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* LOGO + INTRO */}
        <div>
          <h2 className="text-3xl font-extrabold text-yellow-800 mb-4 tracking-wide">
            TourBU
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            ร่วมค้นหาประสบการณ์ใหม่กับเรา TourBU
            ทุกการเดินทางมีความหมาย และความทรงจำจะอยู่กับคุณตลอดไป
          </p>
        </div>

        {/* ลิงก์เมนู */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-700 mb-3">เมนูหลัก</h3>
          <ul className="text-sm space-y-2">
            <li><Link to="/" className="hover:text-yellow-600 transition">หน้าแรก</Link></li>
            <li><Link to="/Trips" className="hover:text-yellow-600 transition">ทริปทั้งหมด</Link></li>
            <li><Link to="/Gallery" className="hover:text-yellow-600 transition">แกลเลอรี่</Link></li>
            <li><Link to="/Aboutus" className="hover:text-yellow-600 transition">เกี่ยวกับเรา</Link></li>
          </ul>
        </div>

        {/* ช่องทางติดต่อ */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-700 mb-3">ติดต่อเรา</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-yellow-700" />
              02-123-4567
            </li>
            <li className="flex items-center gap-2">
              <FaLine className="text-green-500" />
              @tourbu
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-red-500 mt-1" />
              123 ถ.ท่องเที่ยว แขวงผจญภัย กรุงเทพฯ 10200
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-700 mb-3">ติดตามเรา</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center hover:scale-110 transition">
              <FaFacebookF className="text-yellow-700 text-lg" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center hover:scale-110 transition">
              <FaInstagram className="text-yellow-700 text-lg" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center hover:scale-110 transition">
              <FaLine className="text-yellow-700 text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* เส้นคั่น + Copy */}
      <div className="mt-12 pt-6 border-t border-yellow-200 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TourBU. All rights reserved.
      </div>
    </footer>
  );
}
