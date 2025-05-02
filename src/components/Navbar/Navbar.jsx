import { useState } from "react";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-12 py-4">
        {/* โลโก้ */}
        <div className="text-2xl font-bold bg-gradient-to-r from-yellow-800 to-orange-500 bg-clip-text text-transparent">
          TourBU
        </div>

        {/* เมนูสำหรับ Desktop */}
        <ul className="hidden lg:flex gap-x-10 text-orange-600 font-bai text-lg">
          <Link to="/" className="hover:text-yellow-700 transition">
            หน้าหลัก
          </Link>
          <Link to="/Trips" className="hover:text-yellow-700 transition">
            ทริปท่องเที่ยว
          </Link>
          <Link to="/Gallery" className="hover:text-yellow-700 transition">
            แกลเลอรี่
          </Link>
        </ul>

        {/* ปุ่มติดต่อเรา */}
        <button className="hidden lg:flex items-center gap-2 border border-orange-300 px-3 py-2 rounded-md text-orange-700 hover:border-yellow-700 hover:text-yellow-700 transition">
          <FiPhone className="text-lg" />
          ติดต่อเรา
        </button>

        {/* Hamburger Menu สำหรับมือถือ */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-orange-600"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* เมนูสำหรับมือถือ */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-8 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col text-center text-orange-600 font-bai text-lg py-4">
          <Link
            to="/"
            className="py-2 hover:text-yellow-700 transition"
            onClick={() => setIsOpen(false)}
          >
            หน้าหลัก
          </Link>
          <Link
            to="/Trips"
            className="py-2 hover:text-yellow-700 transition"
            onClick={() => setIsOpen(false)}
          >
            ทริปท่องเที่ยว
          </Link>
          <Link
            to="/Aboutus"
            className="py-2 hover:text-yellow-700 transition"
            onClick={() => setIsOpen(false)}
          >
            เกี่ยวกับเรา
          </Link>
          <Link
            to="/Gallery"
            className="py-2 hover:text-yellow-700 transition"
            onClick={() => setIsOpen(false)}
          >
            แกลเลอรี่
          </Link>
          <button
            className="flex items-center justify-center gap-2 border border-orange-300 mx-6 px-3 py-2 rounded-md text-orange-700 hover:border-yellow-700 hover:text-yellow-700 transition"
            onClick={() => setIsOpen(false)}
          >
            <FiPhone className="text-lg" />
            ติดต่อเรา
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
