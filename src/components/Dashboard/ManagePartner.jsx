import React, { useState, useEffect } from "react";
import axios from "axios";

const ManagePartner = () => {
  const [partners, setPartners] = useState([]);
  const [newName, setNewName] = useState("");
  const [newLogo, setNewLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState("");

  // ✅ โหลดข้อมูล Partner Brands จาก API
  useEffect(() => {
    axios
      .get("https://projecttour-b58cf17beb2d.herokuapp.com/api/partners")
      .then((res) => setPartners(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ ฟังก์ชันเพิ่มพาร์ทเนอร์
  const addPartner = async () => {
    if (!newName.trim() || !newLogo) return;

    const formData = new FormData();
    formData.append("file", newLogo);
    formData.append("name", newName);

    axios
      .post("https://projecttour-b58cf17beb2d.herokuapp.com/api/partners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setPartners([...partners, res.data]);
        setNewName("");
        setNewLogo(null);
        setPreviewLogo("");
      })
      .catch((err) => console.error(err));
  };

  // ✅ ฟังก์ชันลบพาร์ทเนอร์
  const deletePartner = (id) => {
    axios
      .delete(`https://projecttour-b58cf17beb2d.herokuapp.com/api/partners/${id}`)
      .then(() => {
        setPartners(partners.filter((partner) => partner.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Manage Partner Brands</h2>

      {/* ✅ ฟอร์มเพิ่มแบรนด์พาร์ทเนอร์ */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-2">Add New Partner</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Brand Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            onChange={(e) => {
              setNewLogo(e.target.files[0]);
              setPreviewLogo(URL.createObjectURL(e.target.files[0]));
            }}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={addPartner}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        {previewLogo && (
          <div className="mt-4">
            <img src={previewLogo} alt="Preview" className="w-20 h-20 object-contain mx-auto" />
          </div>
        )}
      </div>

      {/* ✅ แสดงรายการ Partner Brands */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">Partner List</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <li key={partner.id} className="p-4 border rounded flex flex-col items-center">
              <img src={partner.logo} alt={partner.name} className="w-20 h-20 object-contain" />
              <span className="mt-2 text-center">{partner.name}</span>
              <button
                onClick={() => deletePartner(partner.id)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagePartner;