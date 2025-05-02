import bgtrip from "../../assets/background1.png";
import earth from "../../assets/icon/earth.svg";
import icondown from "../../assets/icon/chevron-down.svg";
import calendar from "../../assets/icon/calendar.svg";
import search from "../../assets/icon/search.svg";

import { useEffect, useState } from "react";
import axios from "axios";
import CountrySelectBegin from "../CouuntryDDL/begin";

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

const BeginTrip = () => {
  const [country, setCountry] = useState([]);
  const [Range, setRange] = useState("");
  const [DDL_Country, setDDL_Country] = useState([]);

  const handleSearch = () => {
    const params = new URLSearchParams({
      country_send: country.value,
      month_send: Range,
    }).toString();
    window.location.href = `/Trips?${params}`;
  };

  const GetData = async () => {
    try {
      const response = await axios.get(
        "https://projecttour-b58cf17beb2d.herokuapp.com/api/countries"
      );
      setDDL_Country(response.data);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <section className="w-full relative bg-[#FAF6EF] py-16">
      <div
        className="max-w-6xl mx-auto bg-cover bg-center rounded-3xl overflow-hidden shadow-lg"
        style={{ backgroundImage: `url(${bgtrip})` }}
      >
        <div className="backdrop-blur-md bg-white/70 w-full h-full px-8 py-12 flex justify-center items-center">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-yellow-800 mb-6 text-center">
              วางแผนการเดินทางของคุณ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Country */}
              <div>
                <label className="text-sm text-gray-600 mb-2 inline-flex items-center gap-1">
                  ประเทศ
                  <img src={earth} className="w-4" alt="earth" />
                </label>
                <div className="relative">
                  <CountrySelectBegin
                    countries={DDL_Country}
                    selectedCountry={country}
                    setSelectedCountry={setCountry}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <img src={icondown} className="w-4" alt="dropdown" />
                  </div>
                </div>
              </div>

              {/* Month */}
              <div>
                <label className="text-sm text-gray-600 mb-2 inline-flex items-center gap-1">
                  ช่วงเดือน
                  <img src={calendar} className="w-4" alt="calendar" />
                </label>
                <div className="relative">
                  <select
                    value={Range}
                    onChange={(e) => setRange(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-100 text-sm rounded-lg focus:ring-2 focus:ring-yellow-500 appearance-none"
                  >
                    <option value="">ทุกเดือน</option>
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <img src={icondown} className="w-4" alt="dropdown" />
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="flex items-end justify-end">
                <button
                  onClick={handleSearch}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-700 text-white rounded-lg shadow hover:bg-yellow-800 transition duration-200"
                >
                  ค้นหา
                  <img src={search} className="w-5" alt="search" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeginTrip;
