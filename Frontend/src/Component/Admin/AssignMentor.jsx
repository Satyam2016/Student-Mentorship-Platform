import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify"; // Notifications

const AssignMentor = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const token = localStorage.getItem("token");

  // Fetch Students & Mentors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, mentorsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/allUser/student", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/admin/allUser/mentor", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStudents(studentsRes.data || []);
        setMentors(mentorsRes.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    if (token) fetchData();
  }, [token]);

  // Assign Mentor API Call
  const assignMentor = async () => {
    if (!selectedStudent || !selectedMentor) {
      toast.error("Please select both a student and a mentor.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/admin/assign-mentor",
        { studentId: selectedStudent, mentorId: selectedMentor },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Mentor assigned successfully!");
      setSelectedStudent("");
      setSelectedMentor("");
    } catch (error) {
      console.error("Error assigning mentor:", error);
      toast.error(error.response?.data?.message || "Failed to assign mentor.");
    }
  };

  return (
    <div className="min-h-[600px] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Assign Mentor</h2>

        {/* Select Student */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Select Student:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full border bg-white border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Choose a Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} - {student.email}
              </option>
            ))}
          </select>
        </div>

        {/* Select Mentor */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Select Mentor:</label>
          <select
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            className="w-full border bg-white border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Choose a Mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name} - {mentor.email}
              </option>
            ))}
          </select>
        </div>

        {/* Assign Button */}
        <Button
          onClick={assignMentor}
          className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-200"
        >
          Assign Mentor
        </Button>
      </div>
    </div>
  );
};

export default AssignMentor;
