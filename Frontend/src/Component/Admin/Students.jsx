import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/allUser/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete a student
  const deleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Students List</h2>
      <ul className="divide-y divide-gray-300">
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student._id} className="py-3 flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone || "Not Provided"}</p>
              </div>
              <Button
                onClick={() => deleteStudent(student._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
              >
                Delete
              </Button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No students found</p>
        )}
      </ul>
    </div>
  );
};

export default Students;
