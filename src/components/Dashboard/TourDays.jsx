import { useState } from "react";
import axios from "axios";

const TourDaysForm = ({ tourId }) => {
  const [days, setDays] = useState([]);
  const [message, setMessage] = useState("");

  const addDay = () => {
    setDays([
      ...days,
      {
        day_number: idays.length + 1,
        date: "",
        location: "",
        description: "",
        time_schedule: [],
        images: [],
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
  };

  const handleFileChange = (index, files) => {
    const updatedDays = [...days];
    updatedDays[index].images = files;
    setDays(updatedDays);
  };

  const addSchedule = (index) => {
    const updatedDays = [...days];
    updatedDays[index].time_schedule.push({ time: "", activity: "" });
    setDays(updatedDays);
  };

  const handleScheduleChange = (dayIndex, scheduleIndex, field, value) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].time_schedule[scheduleIndex][field] = value;
    setDays(updatedDays);
  };

  // ✅ ลบตารางเวลา
  const removeSchedule = (dayIndex, scheduleIndex) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].time_schedule.splice(scheduleIndex, 1);
    setDays(updatedDays);
  };

  const handleSubmit = async () => {
    try {
      for (const day of days) {
        const formData = new FormData();
        formData.append("tour_id", tourId);
        formData.append("day_number", day.day_number);
        formData.append("date", day.date);
        formData.append("location", day.location);
        formData.append("description", day.description);
        formData.append("time_schedule", JSON.stringify(day.time_schedule));

        for (let i = 0; i < day.images.length; i++) {
          formData.append("images", day.images[i]);
        }

        await axios.post(
          "https://projecttour-b58cf17beb2d.herokuapp.com/api/tourdays",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      setMessage("บันทึกข้อมูลแผนทัวร์สำเร็จ!");
    } catch (error) {
      setMessage(error.response?.data?.error || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="">
      <h2>เพิ่มวันเดินทาง</h2>
      {days.map((day, index) => (
        <div key={index} className="my-5">
          <h2>{`วันที่เดินทาง ${day.day_number}`}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* <div className="flex flex-col gap-2">
              <label className="">วันที่เดินทาง</label>
              <input
                value={index + 1}
                disabled={true}
                className="border border-gray-200 rounded-lg p-2"
                type="text"
                placeholder="Day Number"
                onChange={(e) =>
                  handleChange(index, "day_number", e.target.value)
                }
                required
              />
            </div> */}
            <div className="flex flex-col gap-2">
              <label className="">วันที่</label>
              <input
                className="border border-gray-200 rounded-lg p-2"
                type="date"
                onChange={(e) => handleChange(index, "date", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="">สถานที่</label>
              <input
                className="border border-gray-200 rounded-lg p-2"
                type="text"
                placeholder="Location"
                onChange={(e) =>
                  handleChange(index, "location", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="">Description</label>
              <textarea
                className="border border-gray-200 rounded-lg p-2"
                placeholder="Description"
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              ></textarea>
            </div>
          </div>

          <h4 className="text-xl font-seminbold mb-5">{`ตารางเวลาของวันที่ ${
            index + 1
          }`}</h4>
          {day.time_schedule.map((schedule, sIndex) => (
            <div key={sIndex} className="flex items-center my-2 gap-2">
              <input
                className="border border-gray-200 rounded-lg p-2"
                type="time"
                onChange={(e) =>
                  handleScheduleChange(index, sIndex, "time", e.target.value)
                }
              />
              <input
                className="border border-gray-200 rounded-lg p-2"
                type="text"
                placeholder="Activity"
                onChange={(e) =>
                  handleScheduleChange(
                    index,
                    sIndex,
                    "activity",
                    e.target.value
                  )
                }
              />
              {/* 🔥 ปุ่มลบ */}
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => removeSchedule(index, sIndex)}
              >
                ลบ
              </button>
            </div>
          ))}

          <button
            type="button"
            className="border border-gray-200 rounded-lg p-2 bg-gray-400 text-white my-2"
            onClick={() => addSchedule(index)}
          >
            เพิ่มตารางเวลา
          </button>
          <div className="flex items-center gap-4">
            <h4 className="text-xl font-semibold my-5">อัปโหลดรูปภาพ</h4>
            <input
              className="border border-gray-200 p-2 rounded-lg"
              type="file"
              multiple
              onChange={(e) => handleFileChange(index, e.target.files)}
              accept="image/*"
            />
          </div>
        </div>
      ))}

      <div className="flex gap-2 my-4">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addDay}
        >
          เพิ่มวัน
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          บันทึก
        </button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TourDaysForm;
