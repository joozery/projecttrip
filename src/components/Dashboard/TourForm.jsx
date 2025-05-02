import { useState } from "react";
import axios from "axios";

const TourForm = ({ onTourCreated }) => {
  const [formData, setFormData] = useState({
    tour_name: "",
    country_th: "",
    country_en: "",
    price: "",
    start_date: "",
    end_date: "",
  });

  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "image") setImage(e.target.files[0]);
    if (e.target.name === "pdf_file") setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
    if (image) formDataToSend.append("image", image);
    if (pdfFile) formDataToSend.append("pdf_file", pdfFile);

    try {
      const response = await axios.post("https://projecttour-b58cf17beb2d.herokuapp.com/api/tours", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      onTourCreated(response.data.id); // ส่ง tour_id ไปใช้กับ TourDaysForm
    } catch (error) {
      setMessage(error.response?.data?.error || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div>
      <h2>เพิ่มทัวร์</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="border border-gray-200 rounded-lg p-2" type="text" name="tour_name" placeholder="ชื่อทัวร์" onChange={handleChange} required />
        <input className="border border-gray-200 rounded-lg p-2" type="text" name="country_th" placeholder="ประเทศ (TH)" onChange={handleChange} />
        <input className="border border-gray-200 rounded-lg p-2" type="text" name="country_en" placeholder="ประเทศ (EN)" onChange={handleChange} required />
        <input className="border border-gray-200 rounded-lg p-2" type="number" name="price" placeholder="ราคา" onChange={handleChange} required />
        <input className="border border-gray-200 rounded-lg p-2" type="text" name="duration" placeholder="จำนวนวัน" onChange={handleChange} required />
        <input className="border border-gray-200 rounded-lg p-2" type="date" name="start_date" onChange={handleChange} required />
        <input className="border border-gray-200 rounded-lg p-2" type="date" name="end_date" onChange={handleChange} required />
        <input className="border border-gray-200 rounded-lg p-2" type="file" name="image" onChange={handleFileChange} accept="image/*" />
        <input className="border border-gray-200 rounded-lg p-2" type="file" name="pdf_file" onChange={handleFileChange} accept="application/pdf" />
        </div>
        <button type="submit" className="border border-blue-800 bg-blue-600 text-white rounded-lg p-2 mt-5">บันทึก</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TourForm;
