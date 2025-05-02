import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ ใช้ SweetAlert2
import { FiTrash2, FiEdit } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import CountryFlag from "../CountryFlag";

const API_URL =
  "https://projecttour-b58cf17beb2d.herokuapp.com/api/countries";

const ManageCountry = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [newCountryTH, setNewCountryTH] = useState("");
  const [newEmoji, setNewEmoji] = useState("");
  const [loading, setLoading] = useState(false); // ✅ State สำหรับ Loading
  const [dataloading, setdataloading] = useState(false);

  // ✅ State สำหรับแก้ไขประเทศ
  const [editCountry, setEditCountry] = useState(null);
  const [editName, setEditName] = useState("");
  const [editNameTH, setEditNameTH] = useState("");
  const [editEmoji, setEditEmoji] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ✅ โหลดข้อมูลประเทศ
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    setdataloading(true);
    axios
      .get(API_URL)
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error fetching countries:", err))
      .finally(() => setdataloading(false));
  };

  // ✅ เพิ่มประเทศ
  const addCountry = () => {
    if (!newCountry.trim() || !newEmoji.trim()) return;

    setLoading(true); // ✅ เริ่ม Loading
    const newEntry = {
      name: newCountry,
      name_th: newCountryTH,
      emoji: newEmoji,
    };

    axios
      .post(API_URL, newEntry)
      .then((res) => {
        setCountries([...countries, res.data]);
        setNewCountry("");
        setNewCountryTH("");
        setNewEmoji("");

        Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ!",
          text: "ประเทศถูกเพิ่มเรียบร้อยแล้ว",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => console.error("Error adding country:", err))
      .finally(() => setLoading(false)); // ✅ ปิด Loading
  };

  // ✅ ลบประเทศ
  const deleteCountry = (id) => {
    Swal.fire({
      title: "คุณแน่ใจไหม?",
      text: "คุณต้องการลบประเทศนี้ใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}/${id}`)
          .then(() => {
            setCountries(countries.filter((country) => country.id !== id));
            Swal.fire("ลบสำเร็จ!", "ประเทศถูกลบแล้ว", "success");
          })
          .catch((err) => console.error("Error deleting country:", err));
      }
    });
  };

  // ✅ เปิด Modal แก้ไข
  const openEditModal = (country) => {
    setEditCountry(country);
    setEditName(country.name);
    setEditNameTH(country.name_th);
    setEditEmoji(country.emoji);
    setIsEditModalOpen(true);
  };

  // ✅ ปิด Modal แก้ไข
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditCountry(null);
  };

  // ✅ อัปเดตประเทศ
  const updateCountry = () => {
    if (!editName.trim() || !editEmoji.trim()) return;

    setLoading(true); // ✅ เริ่ม Loading
    axios
      .put(`${API_URL}/${editCountry.id}`, {
        name: editName,
        name_th: editNameTH,
        emoji: editEmoji,
      })
      .then(() => {
        setCountries(
          countries.map((c) =>
            c.id === editCountry.id
              ? { ...c, name: editName, name_th: editNameTH, emoji: editEmoji }
              : c
          )
        );
        closeEditModal();

        Swal.fire({
          icon: "success",
          title: "อัปเดตสำเร็จ!",
          text: "ข้อมูลประเทศถูกอัปเดตเรียบร้อยแล้ว",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => console.error("Error updating country:", err))
      .finally(() => setLoading(false)); // ✅ ปิด Loading
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Manage Country</h2>

      {/* ✅ ฟอร์มเพิ่มประเทศ */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <input
          type="text"
          placeholder="Country Name EN"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Country Name TH"
          value={newCountryTH}
          onChange={(e) => setNewCountryTH(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Code Flag"
          value={newEmoji}
          onChange={(e) => setNewEmoji(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addCountry}
          disabled={loading}
          className={`bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Add Country"}
        </button>
      </div>

      {dataloading ? (
        <div className="flex justify-center items-center py-10">
          <div className="flex items-center gap-3">
            <FaSpinner className="animate-spin text-purple-500 text-2xl" />
            <span className="font-semibold text-xl">กำลังโหลดข้อมูล...</span>
          </div>
        </div>
      ) : (
        <ul className="mt-4 border rounded-lg p-4 shadow-md bg-white">
          {countries.map((country, index) => (
            <li
              key={index}
              className="p-2 flex items-center justify-between border-b last:border-none"
            >
              <div className="flex items-center gap-2">
                {/* <CountryFlag countryCode={`${country.emoji}`} /> */}
                <div key={index}>
                  {countries && (
                    <CountryFlag countryCodes={country.emoji} />
                  )}
                </div>
                {country.name} ({country.name_th})
              </div>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => openEditModal(country)}
                >
                  <FiEdit size={18} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteCountry(country.id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Modal แก้ไขประเทศ */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Country</h3>
              {/* 🔥 ปุ่มปิด Modal */}
              <button
                onClick={closeEditModal}
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="Country Name EN"
              value={editName || ""}
              onChange={(e) => setEditName(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Country Name TH"
              value={editNameTH || ""}
              onChange={(e) => setEditNameTH(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Emoji (🇹🇭)"
              value={editEmoji || ""}
              onChange={(e) => setEditEmoji(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex gap-2">
              {/* 🔥 ปุ่มบันทึก */}
              <button
                onClick={updateCountry}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              {/* 🔥 ปุ่มปิด */}
              <button
                onClick={closeEditModal}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCountry;
