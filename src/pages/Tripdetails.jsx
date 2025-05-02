import TripHeader from "./Tripdetails/TripHeader";
import TripDetailsTabs from "./Tripdetails/TripDetailsTabs";
import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { LuArrowLeft } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa";
const TripDetails = () => {
  const { id } = useParams();
  const [Trip, setTrip] = useState([]);
  const [Country, setCountry] = useState(null);
  const [HeaderData, setHeaderData] = useState({
    name_th: "",
    name: "",
    emoji: "",
    price: "",
    title: "",
  });

  const [loading, setLoading] = useState(true);
  const GetDataDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://projecttour-b58cf17beb2d.herokuapp.com/api/tours/${id}`
      );
      // return response.data;
      console.log(response);
      setCountry(response.data.tour.country_id);
      setTrip(response.data);
      setHeaderData({
        name_th: response.data.tour.country_name_th,
        name: response.data.tour.country_name,
        emoji: response.data.tour.country_emoji,
        price: response.data.tour.price,
        title: response.data.tour.tour_name,
      });
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetDataDetails();
  }, []);

  return (
    <section className="relative w-full py-20">
      <div className="container mx-auto">
        {loading ? (
          // ✅ แสดง Loading Spinner (CSS animation)
          <div className="flex justify-center items-center py-10">
            <div className="flex items-center gap-3">
              <FaSpinner className="animate-spin text-[#335A90] text-2xl" />
              <span className="font-semibold text-xl text-[#335A90]">กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        ) : (
          <>
            <TripHeader tourId={Country} HeaderData={HeaderData} />{" "}
            {/* ✅ ใช้ Header ทริป */}
            <TripDetailsTabs data={Trip} /> {/* ✅ เพิ่ม Section ข้อมูลทริป */}
          </>
        )}
      </div>
    </section>
  );
};

export default TripDetails;
