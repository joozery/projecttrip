import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiEdit,
  FiTrash2,
  FiUserPlus,
  FiX,
  FiUploadCloud,
} from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

const API_BASE_URL =
  "https://projecttour-b58cf17beb2d.herokuapp.com/api/users";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
    profileImage: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // ✅ ดึงข้อมูลผู้ใช้
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data.admins);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ฟังก์ชันเพิ่ม / แก้ไขผู้ใช้
  const handleSaveUser = async () => {
    const formData = new FormData();
    formData.append("name", newUser.name);
    formData.append("email", newUser.email);
    formData.append("password", newUser.password);
    formData.append("role", newUser.role);
    if (imageFile) formData.append("profileImage", imageFile);

    try {
      if (editUser) {
        await axios.put(`${API_BASE_URL}/${editUser.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_BASE_URL}/register`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchUsers();
      setShowPopup(false);
      setEditUser(null);
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "Admin",
        profileImage: "",
      });
      setImageFile(null);
      setPreviewImage("");
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-all"
          onClick={() => setShowPopup(true)}
        >
          <FiUserPlus size={20} /> Add User
        </button>
      </div>

      {/* Grid Layout */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="flex items-center gap-3">
            <FaSpinner className="animate-spin text-purple-500 text-2xl" />
            <span className="font-semibold text-xl">กำลังโหลดข้อมูล...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 transition hover:shadow-xl"
            >
              <img
                src={user.profile_image || "https://via.placeholder.com/80"}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm font-semibold text-indigo-600">
                  {user.role}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    setEditUser(user);
                    setNewUser({ ...user, password: "" });
                    setPreviewImage(user.profile_image);
                    setShowPopup(true);
                  }}
                >
                  <FiEdit size={20} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup Add / Edit User */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all scale-95 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {editUser ? "Edit User" : "Add New User"}
              </h2>
              <button onClick={() => setShowPopup(false)}>
                <FiX size={24} className="text-gray-600 hover:text-gray-800" />
              </button>
            </div>

            {/* Upload Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setImageFile(e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer bg-indigo-500 text-white px-3 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
                >
                  <FiUploadCloud size={20} />
                </label>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Input Fields */}
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="block w-full px-3 py-2 border rounded-md mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="block w-full px-3 py-2 border rounded-md mb-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="block w-full px-3 py-2 border rounded-md mb-3"
            />

            <button
              className="bg-indigo-600 text-white px-4 py-2 w-full rounded-lg shadow hover:bg-indigo-700 transition"
              onClick={handleSaveUser}
            >
              {editUser ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
