import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import TourCard from "../CardData";
import { FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = "https://projecttour-b58cf17beb2d.herokuapp.com/api";
const TOUR_API = `${API_BASE_URL}/tours`;

const ManageTour = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // ✅ new filter state
  const navigate = useNavigate();

  // ✅ โหลดข้อมูลทัวร์
  const GetData = async () => {
    try {
      const response = await axios.get(TOUR_API);
      setData(response.data.tours);
    } catch (error) {
      console.error("Error loading tours:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  // ✅ ฟิลเตอร์ข้อมูลตามสถานะ
  const filteredData = Data.filter((tour) => {
    if (filter === "public") return tour.status === "1";
    if (filter === "draft") return tour.status === "0";
    return true; // all
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Tours</h1>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 hover:bg-purple-700 transition"
          onClick={() => navigate("/admin/add-tour")}
        >
          <FiPlusCircle size={20} /> Add New Tour
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 border-b border-gray-300 pb-2 mb-4">
        {["all", "public", "draft"].map((type) => (
          <button
            key={type}
            className={`pb-2 px-4 font-semibold border-b-4 transition ${
              filter === type
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-purple-600"
            }`}
            onClick={() => setFilter(type)}
          >
            {type === "all"
              ? "ทั้งหมด"
              : type === "public"
              ? "เผยแพร่"
              : "ฉบับร่าง"}
          </button>
        ))}
      </div>

      {/* Tour List */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="flex items-center gap-3">
            <FaSpinner className="animate-spin text-purple-500 text-2xl" />
            <span className="font-semibold text-xl">กำลังโหลดข้อมูล...</span>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={filter} // 💡 รีเฟรชเมื่อเปลี่ยน filter
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-6"
          >
            {filteredData.length > 0 ? (
              filteredData.map((tour) => (
                <TourCard key={tour.id} tour={tour} Success={GetData} />
              ))
            ) : (
              <div className="col-span-4 text-center text-gray-500 font-medium py-10">
                ไม่มีทัวร์ในหมวดนี้
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ManageTour;
