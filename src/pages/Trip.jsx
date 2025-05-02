// import BeginTrip from "../components/BeginTrip/BeginTrip"; // ✅ Section ค้นหาทริป
import RecommendedTrip from "../components/BeginTrip/RecommendedTrip"; // ✅ Section ทริปแนะนำ
import TripList from "../components/BeginTrip/TripList"; // ✅ Section รายการทริป
import { FaSearch, FaSpinner } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FiGlobe, FiCalendar } from "react-icons/fi"; // ✅ Import ไอคอน
import bgImage from "../assets/Maskgroup.jpg"; // ✅ Import รูปพื้นหลัง
import { useEffect, useState } from "react";
import { LuCalendar, LuEarth, LuSparkles } from "react-icons/lu";
import axios from "axios";
import CountryFlag from "../components/CountryFlag";
import CountrySelect from "../components/CouuntryDDL";
import { useLocation } from "react-router-dom";

const months = [
  { value: "01", label: "มกราคม" },
  { value: "02", label: "กุมภาพันธ์" },
  { value: "03", label: "มีนาคม" },
  { value: "04", label: "เมษายน" },
  { value: "05", label: "พฤษภาคม" },
  { value: "06", label: "มิถุนายน" },
  { value: "07", label: "กรกฎาคม" },
  { value: "08", label: "สิงหาคม" },
  { value: "09", label: "กันยายน" },
  { value: "10", label: "ตุลาคม" },
  { value: "11", label: "พฤศจิกายน" },
  { value: "12", label: "ธันวาคม" },
];

const currentYear = new Date().getFullYear() + 543; // แปลงเป็น พ.ศ.
const years = [currentYear, currentYear - 1, currentYear - 2]; // ✅ เอาปีล่าสุด + ย้อนหลัง 2 ปี

const TripPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const country_send = params.get("country_send")
    ? Number(params.get("country_send"))
    : null;

  const [range, setRange] = useState(params.get("month_send") || "");
  const [year, setYear] = useState("");
  const [Country, setCountry] = useState({
    value: country_send || "",
  });
  const [Data, setData] = useState([]);
  const [DDL_Country, setDDL_Country] = useState([]);
  const [RecommendData, setRecommendData] = useState(null);
  const [loading, setLoading] = useState(false);

  const GetData = async () => {
    const body = {
      country_id: Country.value,
      month: range,
      year: year ? (parseInt(year) - 543).toString() : "", // ✅ แปลง พ.ศ. → ค.ศ.
    };
    console.log(body);
    // return;

    setLoading(true);
    try {
      const [countriesResponse, toursResponse, recommendResponse] =
        await Promise.all([
          axios.get(
            `https://projecttour-b58cf17beb2d.herokuapp.com/api/countries`
          ),
          axios.post(
            `https://projecttour-b58cf17beb2d.herokuapp.com/api/tours/search`,
            body
          ),
          axios.post(
            `https://projecttour-b58cf17beb2d.herokuapp.com/api/tours/search/recommend`,
            body
          ),
        ]);

      setDDL_Country(countriesResponse.data);
      setData(toursResponse.data.tours);
      setRecommendData(recommendResponse.data.tours); // เพิ่ม state สำหรับเก็บข้อมูล recommend
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ โหลดค่าจาก params ทันทีที่หน้าโหลด
  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    console.log(Data);
  }, [Data]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start pt-20">
        {loading ? (
          // ✅ แสดง Loading Spinner (CSS animation)
          <div className="flex justify-center items-center py-10">
            <div className="flex items-center gap-3">
              <FaSpinner className="animate-spin text-[#335A90] text-2xl" />
              <span className="font-semibold text-xl text-[#335A90]">
                กำลังโหลดข้อมูล...
              </span>
            </div>
          </div>
        ) : (
          <>
            <section
              className="relative w-full min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              {/* กล่องฟอร์ม */}
              <div className="bg-white shadow-lg rounded-xl p-8 w-[90%] max-w-2xl mx-auto font-bai">
                <div className="flex flex-col items-start">
                  <h2 className="text-3xl font-semibold text-[#18283E] text-center">
                    เริ่มต้นการท่องเที่ยว
                  </h2>
                  <p className="text-[#748193] text-center text-base font-medium">
                    ค้นหาช่วงเวลาท่องเที่ยวที่ดีที่สุดที่คุณต้องการ
                  </p>
                </div>

                {/* ฟอร์มค้นหา */}
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    {/* ประเทศ */}
                    <div className="col-span-1 space-y-2">
                      <div className="flex flex-col items-start">
                        <div className="flex justify-start items-center gap-1 text-[#748193]">
                          <label className="">ประเทศ</label>
                          <LuEarth />
                        </div>
                      </div>
                      <CountrySelect
                        countries={DDL_Country}
                        selectedCountry={Country}
                        setSelectedCountry={setCountry}
                      />
                    </div>

                    {/* ช่วงเวลา */}
                    <div className="col-span-2 space-y-2">
                      <div className="flex flex-col items-start">
                        <div className="flex justify-start items-center gap-1 text-[#748193]">
                          <label className="">ช่วงเวลา</label>
                          <LuCalendar />
                        </div>
                      </div>
                      <div className="w-full flex justify-center items-center rounded-lg bg-[#F6F6F6]">
                        <select
                          value={range}
                          onChange={(e) => setRange(e.target.value)}
                          className="font-medium w-full p-2 focus:border-none focus:outline-none bg-transparent"
                        >
                          <option value="">ทุกเดือน</option>{" "}
                          {/* ✅ เพิ่มตัวเลือก "ทุกเดือน" */}
                          {months.map((month) => (
                            <option key={month.value} value={month.value}>
                              {month.label}
                            </option>
                          ))}
                        </select>
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="font-medium w-full border-s border-gray-300 pl-2 mr-2 p-2 focus:outline-none bg-transparent"
                        >
                          <option value="">ทุกปี</option>{" "}
                          {/* ✅ เพิ่มตัวเลือก "ทุกปี" */}
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ปุ่มค้นหา */}
                  <button
                    className="w-full flex justify-center items-center bg-[#3F72B7] text-white py-2 rounded-md shadow-md hover:bg-[#305a92] transition font-semibold"
                    onClick={() => GetData()}
                    // onClick={handleSearch}
                  >
                    ค้นหา <FaSearch className="ml-2" size={15} />
                  </button>

                  {/* หรือ */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-400"></div>
                    <span className="text-gray-500 font-medium">หรือ</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-400"></div>
                  </div>

                  {/* จัดทริปส่วนตัว */}
                  {/* <div className="gradient-border-trip p-3 flex items-center justify-between shadow-md">
              <div>
                <p className="text-[#18283E] font-semibold">จัดทริปส่วนตัว</p>
                <p className="text-xs text-gray-700 font-medium">
                  ประสบการณ์ดีเพื่อคุณโดยเฉพาะ!
                </p>
              </div>
              <HiOutlineSparkles className="text-[#18283E] text-xl" />
            </div> */}

                  <div className="relative rounded-lg bg-gradient-to-r from-[#5A7BF5] via-[#E87BDE] to-[#FF8E63] p-[2px] shadow-md hover:scale-[102%] duration-300 cursor-pointer">
                    {/* <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-[#5A7BF5] via-[#E87BDE] to-[#FF8E63]"></div> */}
                    <div className="relative bg-white/80 backdrop-blur-lg rounded-md flex justify-between items-center py-2 px-4">
                      <div className="">
                        <h1 className="text-2xl font-semibold bg-gradient-to-l from-[#18283E] to-[#3F72B7] text-transparent bg-clip-text">
                          จัดทริปส่วนตัว
                        </h1>
                        <p className="text-lg text-black">
                          ประสบการณ์เพื่อคุณโดยเฉพาะ!
                        </p>
                      </div>
                      <LuSparkles className="text-[#3F72B7] text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* ✅ แสดง Section ทริปแนะนำ */}
            {RecommendData &&
            RecommendData.filter((item) => item.status === "1").length > 0 ? (
              <RecommendedTrip
                data={RecommendData.filter((item) => item.status === "1")}
              />
            ) : (
              <div className="w-full text-center text-gray-500 text-lg font-semibold py-10">
                ไม่มีข้อมูลทริปแนะนำ
              </div>
            )}

            {/* ✅ แสดง Section ทริปแนะนำ */}
            {Data && Data.filter((item) => item.status === "1").length > 0 ? (
              <TripList trips={Data.filter((item) => item.status === "1")} />
            ) : (
              <div className="w-full text-center text-gray-500 text-lg font-semibold py-10">
                ไม่มีข้อมูลทริปที่ค้นหา
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TripPage;
