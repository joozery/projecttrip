import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUploadCloud, FiTrash2, FiXCircle, FiZoomIn } from "react-icons/fi";
import { thumbnailURL } from "../../helper/thumnail-resize";
import Swal from "sweetalert2";
import { LuZoomIn } from "react-icons/lu";

const API_BASE_URL = "https://projecttour-b58cf17beb2d.herokuapp.com/api";
const GALLERY_API = `${API_BASE_URL}/gallery`;
const COUNTRY_API = `${API_BASE_URL}/countries`;

const ManageGallery = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [titleTh, setTitleTh] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [groupedByCategory, setGroupedByCategory] = useState({});
  const [selectedCountryView, setSelectedCountryView] = useState(null); // ✅ ดูหมวดหมู่เดียว

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(COUNTRY_API);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get(GALLERY_API);
      setGalleryImages(response.data);

      // ✅ แยกรูปตามหมวดหมู่ (country_id)
      const grouped = {};
      response.data.forEach((img) => {
        if (!grouped[img.category_id]) {
          grouped[img.category_id] = [];
        }
        grouped[img.category_id].push(img);
      });

      setGroupedByCategory(grouped);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCountryView(null);
  };

  const handleCountryClick = (categoryId) => {
    setSelectedCountryView(categoryId);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...previewImages];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  const handleUpload = async () => {
    if (!selectedCategory || !titleTh || imageFiles.length === 0) {
      alert("กรุณาเลือกหมวดหมู่ กรอกชื่อภาพ และอัปโหลดรูปภาพ");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", selectedCategory);
    formData.append("title_th", titleTh);
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post(`${GALLERY_API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("อัปโหลดแกลเลอรีสำเร็จ!");
      setImageFiles([]);
      setPreviewImages([]);
      setSelectedCategory("");
      setTitleTh("");
      fetchGalleryImages();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("อัปโหลดไม่สำเร็จ!");
    }
  };

  const handleDeleteImage = async (id) => {
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบรูปนี้ใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${GALLERY_API}/${id}`);
        Swal.fire("ลบแล้ว!", "รูปภาพถูกลบเรียบร้อย", "success");
        fetchGalleryImages();
      } catch (error) {
        console.error("Failed to delete image:", error);
        Swal.fire("ผิดพลาด!", "ไม่สามารถลบรูปได้", "error");
      }
    }
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? `${cat.name}` : `ไม่ทราบชื่อ`;
  };

  const getCategoryFlag = (id) => {
    const emoji = categories.find((c) => c.id === id);
    return emoji ? `${emoji.emoji}` : "ไม่ทราบชื่อ";
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">จัดการแกลเลอรี</h1>

      {/* ✅ Upload Form */}
      {/* ... (คงไว้เหมือนเดิม) */}

      {/* ✅ Gallery View */}
      <h2 className="text-2xl font-bold text-gray-800 pb-2">
        {selectedCountryView
          ? `ดูรูปภาพในประเทศ: ${getCategoryName(Number(selectedCountryView))}`
          : "หมวดหมู่ที่มีรูปภาพ"}
      </h2>

      {/* {form ค้นหา ประเทศ} */}
      {!selectedCountryView && (
        <>
          {/* ✅ เลือกหมวดหมู่ */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              เลือกหมวดหมู่
            </label>
            <select
              className="mt-1 block w-full border-black-700 rounded-md shadow-sm p-2 border"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {/* {category.emoji}  */}
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ กรอกชื่อภาพภาษาไทย */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ชื่อภาพ (ภาษาไทย)
            </label>
            <input
              type="text"
              placeholder="กรอกชื่อภาพ"
              value={titleTh}
              onChange={(e) => setTitleTh(e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
            />
          </div>

          {/* ✅ อัปโหลดรูป */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              อัปโหลดรูปภาพ
            </label>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="fileUpload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition flex items-center gap-2"
              >
                <FiUploadCloud size={20} /> เลือกรูป
              </label>
            </div>
          </div>

          {/* ✅ แสดง preview รูปที่เลือกอัปโหลด */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {previewImages.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg shadow"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FiXCircle size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ✅ ปุ่มอัปโหลด */}
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition w-full mb-3"
            onClick={handleUpload}
          >
            อัปโหลดแกลเลอรี
          </button>
        </>
      )}

      {/* ✅ ดูรูปของประเทศที่เลือก */}
      {selectedCountryView ? (
        <>
          <button
            className="mb-4 p-2 text-gray-400 border rounded-lg hover:bg-gray-300 hover:text-white transition"
            onClick={handleBackToCategories}
          >
            ← ย้อนกลับ
          </button>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {groupedByCategory[selectedCountryView]?.map((image) => (
              <div
                key={image.id}
                className="relative bg-white rounded-lg shadow"
              >
                <div className="relative group">
                  <img
                    src={thumbnailURL(image.image_url)}
                    alt={image.title_th}
                    loading="lazy"
                    className="w-full h-32 object-cover rounded-t-lg"
                  />

                  {/* ไอคอนขยายภาพที่มุมขวาล่าง */}
                  <button
                    onClick={() => setPreviewImage(image.image_url)}
                    className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full transition-all duration-200"
                  >
                    <FiZoomIn size={18} />
                  </button>
                </div>

                <p className="text-sm text-gray-700 p-2 mb-0">
                  ชื่อรูป : {image.title_th}
                </p>
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl font-bold mb-3">
            โฟลเดอร์รูปภาพแต่ละประเทศ
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(groupedByCategory).map((categoryId) => (
              <div
                key={categoryId}
                className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer hover:bg-gray-50 transition"
                onClick={() => handleCountryClick(categoryId)}
              >
                <span
                  className={`fi fi-${getCategoryFlag(
                    Number(categoryId)
                  )} text-4xl mb-2`}
                ></span>
                <span className="text-lg font-medium text-indigo-800">
                  {getCategoryName(Number(categoryId))}
                </span>
                <span className="text-sm text-gray-600">
                  จำนวนรูป: {groupedByCategory[categoryId].length}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 text-white text-xl bg-black/50 rounded-full p-1 h-8 w-8 hover:bg-black"
            >
              ✕
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
