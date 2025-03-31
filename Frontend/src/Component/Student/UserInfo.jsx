import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { MdEmail, MdPhone, MdSchool } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // Fetch user details
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  if (!user)
    return <p className="text-center text-red-500">User data not found</p>;

  // Function to format missing data
  const getValue = (value) => value || "Not Provided";

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-10 border border-gray-200">
      {/* Profile Avatar */}
      <div className="flex justify-center">
        <IoPersonCircleSharp className="text-gray-500 text-7xl" />
      </div>

      <h2 className="text-2xl font-semibold text-center text-gray-800 mt-4">
        {getValue(user.name)}
      </h2>

      {/* User Details */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-2 text-gray-700">
          <MdEmail className="text-xl text-blue-500" />
          <span className="font-medium">Email:</span>
          <span>{getValue(user.email)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MdPhone className="text-xl text-green-500" />
          <span className="font-medium">Phone:</span>
          <span>{getValue(user.phone)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MdSchool className="text-xl text-purple-500" />
          <span className="font-medium">Branch:</span>
          <span>{getValue(user.branch)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Mentor Name:</span>
          <span>{getValue(user.mentorName)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Year:</span>
          <span>{getValue(user.year)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">CGPA:</span>
          <span>{getValue(user.cgpa)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Date of Birth:</span>
          <span>{getValue(user.dob)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Bio:</span>
          <span>{getValue(user.bio)}</span>
        </div>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => alert("Edit functionality to be implemented")}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <FaUserEdit />
        Edit Profile
      </button>
    </div>
  );
};

export default UserInfo;
