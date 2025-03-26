import React, { useState, useEffect } from "react";
import axios from "axios";
import { Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2"; // Ensure installed: `npm install sweetalert2`

const PrivateChat = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [chats, setChats] = useState({});
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const mentor_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/mentor/studentList/${mentor_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch students.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchChatHistory = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/mentor/fetchChat/${mentor_id}/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats((prev) => ({ ...prev, [user_id]: response.data.chat || [] }));
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const selectStudent = (student) => {
    setSelectedStudent(student);
    if (!chats[student._id]) {
      fetchChatHistory(student._id);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedStudent) return;

    const newMessage = { userType: "mentor", msg: message };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/mentor/addChatMessage`,  // ✅ Correct API Endpoint
        {
          mentor_id,
          user_id: selectedStudent._id,
          userType: "mentor",
          msg: message,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Append the new message to chat history
      setChats((prev) => ({
        ...prev,
        [selectedStudent._id]: [...(prev[selectedStudent._id] || []), newMessage],
      }));

      setMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full bg-white shadow-xl rounded-2xl border border-gray-200 overflow-y-auto">
      {/* Student List */}
      <div className="w-1/3 border-r border-gray-300 p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
          <Users className="h-5 w-5 text-gray-600" /> Students
        </h3>

        {/* Scrollable Student List */}
        <ul className="space-y-2 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {loading ? (
            <p className="text-gray-500 text-sm text-center">Loading...</p>
          ) : students.length > 0 ? (
            students.map((student) => (
              <li
                key={student._id}
                className={`p-2 cursor-pointer rounded-lg ${
                  selectedStudent?._id === student._id ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => selectStudent(student)}
              >
                {student.name}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center">No students found.</p>
          )}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col p-4 h-full">
        {selectedStudent ? (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Chat with {selectedStudent.name}</h3>

            {/* Scrollable Chat Messages */}
            <div className="flex-1 overflow-y-auto border border-gray-300 p-3 rounded-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {chats[selectedStudent._id]?.length > 0 ? (
                chats[selectedStudent._id].map((msg, index) => (
                  <p
                    key={index}
                    className={`font-thin p-2 m-1 rounded-md ${
                      msg.userType === "mentor"
                        ? "bg-blue-500 w-fit text-white self-end ml-auto"
                        : "bg-gray-200 text-gray-700 w-fit"
                    }`}
                  >
                    {msg.msg}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center">No messages yet. Start a conversation!</p>
              )}
            </div>

            {/* Chat Input (Always Visible) */}
            <div className="mt-3 flex gap-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full"
              />
              <Button onClick={sendMessage} className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
                <Send className="h-5 w-5" /> Send
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center w-full flex items-center justify-center h-full">
            Select a student to start chatting
          </p>
        )}
      </div>
    </div>
  );
};

export default PrivateChat;
