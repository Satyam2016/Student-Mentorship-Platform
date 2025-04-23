import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit, FaSave } from "react-icons/fa";
import { MdEmail, MdPhone, MdSchool } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setEditedUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Construct the payload with only editable fields
      const updatedFields = {
        name: editedUser.name,
        phone: editedUser.phone,
        branch: editedUser.branch,
        year: editedUser.year,
        cgpa: editedUser.cgpa,
        dob: editedUser.dob,
        bio: editedUser.bio,
      };
  
      // Send PUT request with filtered data
      await axios.put(`http://localhost:5000/api/student/user/${userId}`, updatedFields, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Update the local state
      setUser((prevUser) => ({ ...prevUser, ...updatedFields }));
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving user data:", err);
    }
  };
  

  const getValue = (value) => value || "Not Provided";

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  if (!user)
    return <p className="text-center text-red-500">User data not found</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-10 border border-gray-200">
      <div className="flex justify-center">
        <IoPersonCircleSharp className="text-gray-500 text-7xl" />
      </div>

      <h2 className="text-2xl font-semibold text-center text-gray-800 mt-4">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className="bg-gray-100 rounded px-2 py-1 w-full text-center"
          />
        ) : (
          getValue(user.name)
        )}
      </h2>

      <div className="mt-6 space-y-4">
      {[
        { label: "Email", icon: <MdEmail className="text-blue-500" />, name: "email" },
        { label: "Phone", icon: <MdPhone className="text-green-500" />, name: "phone" },
        { label: "Branch", icon: <MdSchool className="text-purple-500" />, name: "branch" },
        { label: "Mentor Name", name: "mentorName" },
        { label: "Year", name: "year" },
        { label: "CGPA", name: "cgpa" },
        { label: "Date of Birth", name: "dob" },
        { label: "Bio", name: "bio" },
      ].map(({ label, icon, name }) => (
        <div key={name} className="flex items-center gap-2 text-gray-700">
          {icon}
          <span className="font-medium">{label}:</span>
          {name === "email" || name === "mentorName" ? (
            <span>{getValue(user[name])}</span>
          ) : isEditing ? (
            <input
              type="text"
              name={name}
              value={editedUser[name] || ""}
              onChange={handleChange}
              className="bg-gray-100 rounded px-2 py-1 w-full"
            />
          ) : (
            <span>{getValue(user[name])}</span>
          )}
        </div>
      ))}
    </div>
    
      {isEditing ? (
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
        >
          <FaSave />
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <FaUserEdit />
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default UserInfo;
