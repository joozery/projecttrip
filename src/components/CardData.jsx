import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import axios from "axios";
import CountryFlag from "./CountryFlag";
import { Switch } from "antd";
import TourStatusSwitch from "./TourStatusSwitch";
import { thumbnailURL } from "../helper/thumnail-resize";

const API_BASE_URL =
  "https://projecttour-b58cf17beb2d.herokuapp.com/api/tours";

const TourCard = ({ tour, Success }) => {
  const navigate = useNavigate();

  const [newStatus, setStatus] = useState(tour.status);

  useEffect(() => {
    console.log(tour);
  }, []);
  // ✅ ฟังก์ชันลบ
  const handleDelete = async () => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "ทัวร์นี้จะถูกลบและไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await axios.delete(`${API_BASE_URL}/${tour.id}`);
          console.log(result);
          if (result.status === 200) {
            Swal.fire("ลบสำเร็จ!", "ทัวร์ถูกลบแล้ว", "success");
          }
          Success();
        } catch (error) {
          // Swal.fire("เกิดข้อผิดพลาด!", "ลบทัวร์ไม่สำเร็จ", "error");
          console.log(error);
        }
      }
    });
  };

  // useEffect(() => {
  //   if (tour?.status) {
  //     setStatus(tour.status.toString());
  //   }
  // }, [tour]);

  return (
    <div className="w-full h-full flex flex-col rounded overflow-hidden shadow-lg mt-2 bg-white">
      {/* รูปภาพ */}
      {/* {tour.image ? (
        <img
          className="w-full h-40 object-cover"
          src={tour.image}
          alt={tour.tour_name}
        />
      ) : (
        <img
          className="w-full h-40 object-cover"
          src="https://placehold.co/600x400"
          alt="placeholder"
        />
      )} */}
      <div className="relative">
        {tour.image ? (
          <img
            className="w-full h-40 object-cover filter brightness-[90%]"
            src={thumbnailURL(tour.image)}
            alt={tour.tour_name}
          />
        ) : (
          <img
            className="w-full h-40 object-cover filter brightness-[90%]"
            src="https://placehold.co/600x400"
            alt="placeholder"
          />
        )}

        {/* ✅ สถานะ Public: วงกลมเขียวกระพริบ */}
        {tour.status === "1" && (
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-white px-1 py-0.5 rounded bg-gray-50-">
              Public
            </span>
          </div>
        )}

        {/* ✅ สถานะ Draft: ป้ายสีเหลืองปกติ */}
        {tour.status === "0" && (
         <div className="absolute top-2 right-2 flex items-center gap-1">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
            <span className="text-sm text-white px-1 py-0.5 rounded bg-gray-50-">
              Draft
            </span>
          </div>
        )}
      </div>

      {/* ส่วนข้อมูล + ทำให้ยืดเต็มพื้นที่ได้ */}
      <div className="flex flex-col gap-2 px-5 pt-4 flex-grow">
        <div className="font-bold text-xl mb-1">{tour.tour_name}</div>
        <CountryFlag countryCodes={tour.country_emoji} />
        <span className="text-gray-700 text-base">
          ประเทศ: {tour.country_name_th} ({tour.country_name})
        </span>
        <span className="text-gray-700 text-base">ราคา: {tour.price} บาท</span>
        <span className="text-gray-700 text-base">
          วันที่เริ่มต้น: {new Date(tour.start_date).toLocaleDateString()}
        </span>
        <span className="text-gray-700 text-base">
          วันที่สิ้นสุด: {new Date(tour.end_date).toLocaleDateString()}
        </span>
        <span className="text-gray-700 text-base">
          สถานที่: {tour.locations?.join(", ") || "ไม่ระบุ"}
        </span>
      </div>

      {/* ปุ่มแก้ไข / ลบ ดันให้อยู่ล่างสุดเสมอ */}
      {/* <div className="mt-auto flex items-center justify-between px-5 py-3">
        <button
          onClick={() => navigate(`/admin/edit-tour/${tour.id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
        >
          <FiEdit /> แก้ไข
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-600"
        >
          <FiTrash2 /> ลบ
        </button>
      </div> */}
      <div className="mt-auto flex flex-col gap-2 px-5 py-3">
        {/* ปุ่มแก้ไข/ลบ */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <button
            onClick={() => navigate(`/admin/edit-tour/${tour.id}`)}
            className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600"
          >
            <FiEdit /> แก้ไข
          </button>
          <button
            onClick={handleDelete}
            className="w-1/2 bg-red-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600"
          >
            <FiTrash2 /> ลบ
          </button>
        </div>

        {/* ✅ สวิตช์สถานะ */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-sm">
            {tour.status === "1" ? "Public" : "Draft"}
          </span>

          <TourStatusSwitch tour={tour} Success={Success} />
        </div>
      </div>
    </div>
  );
};

export default TourCard;
