import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEmail, MdPhone, MdWork, MdSchool } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";

const MentorInfo = () => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const mentorId = localStorage.getItem("mentor_id");
  const token = localStorage.getItem("token");

  // Fetch mentor details
  const fetchMentor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/user/${mentorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMentor(response.data);
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentor();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  if (!mentor)
    return <p className="text-center text-red-500">Mentor data not found</p>;

  // Function to format missing data
  const getValue = (value) => value || "Not Provided";

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-10 border border-gray-200">
      {/* Profile Avatar */}
      <div className="flex justify-center">
        <IoPersonCircleSharp className="text-gray-500 text-7xl" />
      </div>

      <h2 className="text-2xl font-semibold text-center text-gray-800 mt-4">
        {getValue(mentor.name)}
      </h2>

      {/* Mentor Details */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-2 text-gray-700">
          <MdEmail className="text-xl text-blue-500" />
          <span className="font-medium">Email:</span>
          <span>{getValue(mentor.email)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MdPhone className="text-xl text-green-500" />
          <span className="font-medium">Phone:</span>
          <span>{getValue(mentor.phone)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MdWork className="text-xl text-purple-500" />
          <span className="font-medium">Department:</span>
          <span>{getValue(mentor.department)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MdSchool className="text-xl text-indigo-500" />
          <span className="font-medium">Designation:</span>
          <span>{getValue(mentor.designation)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Number of Students Assigned:</span>
          <span>{getValue(mentor.studentsAssigned?.length || "0")}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Experience:</span>
          <span>{getValue(mentor.experience)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="font-medium">Bio:</span>
          <span>{getValue(mentor.bio)}</span>
        </div>
      </div>
    </div>
  );
};

export default MentorInfo;
