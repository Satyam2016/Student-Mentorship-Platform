import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEmail, MdPhone, MdWork, MdSchool } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";

const MentorInfoo = () => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const mentorId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/student/user/${mentorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMentor(res.data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentor();
  }, [mentorId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentor({ ...mentor, [name]: value });
  };

  const handleToggleEdit = async () => {
    if (isEditing) {
      // Save changes
      try {
        const updated = {
          phone: mentor.phone,
          department: mentor.department,
          designation: mentor.designation,
          experience: mentor.experience,
          bio: mentor.bio,
        };

        await axios.put(
          `http://localhost:5000/api/mentor/update/${mentorId}`,
          updated,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Changes saved successfully!");
      } catch (err) {
        console.error("Error saving changes:", err);
        alert("Failed to save changes.");
      }
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  if (!mentor) return <p className="text-center text-red-500">Mentor not found</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-10 border border-gray-200">
      <div className="flex justify-center">
        <IoPersonCircleSharp className="text-gray-500 text-7xl" />
      </div>

      <h2 className="text-2xl font-semibold text-center text-gray-800 mt-4">
        {mentor.name || "Not Provided"}
      </h2>

      <div className="mt-6 space-y-4">
        {/* Email (Always disabled) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
            <MdEmail className="text-blue-500" />
            Email
          </label>
          <input
            type="email"
            value={mentor.email || ""}
            disabled
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-500"
          />
        </div>

        {/* Editable Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
            <MdPhone className="text-green-500" />
            Phone
          </label>
          <input
            name="phone"
            value={mentor.phone || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
            <MdWork className="text-purple-500" />
            Department
          </label>
          <input
            name="department"
            value={mentor.department || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
            <MdSchool className="text-indigo-500" />
            Designation
          </label>
          <input
            name="designation"
            value={mentor.designation || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Students Assigned
          </label>
          <input
            type="text"
            value={mentor.studentsAssigned?.length || "0"}
            disabled
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <input
            name="experience"
            value={mentor.experience || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={mentor.bio || ""}
            onChange={handleChange}
            rows={3}
            disabled={!isEditing}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleToggleEdit}
            className={`${
              isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
            } text-white px-4 py-2 rounded-md transition duration-200`}
          >
            {isEditing ? "Save Changes" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorInfoo;
