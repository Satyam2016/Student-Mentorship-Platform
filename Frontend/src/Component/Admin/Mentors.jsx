import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch mentors from API
  const fetchMentors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/allUser/mentor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMentors(response.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  // Delete a mentor
  const deleteMentor = async (mentorId) => {
    if (!window.confirm("Are you sure you want to delete this mentor?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${mentorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMentors((prevMentors) => prevMentors.filter((mentor) => mentor._id !== mentorId));
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mentors List</h2>
      <ul className="divide-y divide-gray-300">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <li key={mentor._id} className="py-3 flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {mentor.name}</p>
                <p><strong>Email:</strong> {mentor.email}</p>
                <p><strong>Phone:</strong> {mentor.phone || "Not Provided"}</p>
              </div>
              <Button
                onClick={() => deleteMentor(mentor._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
              >
                Delete
              </Button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No mentors found</p>
        )}
      </ul>
    </div>
  );
};

export default Mentors;
