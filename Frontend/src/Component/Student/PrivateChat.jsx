import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

const StudentPrivateChat = () => {
  const [mentor, setMentor] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef(null);
  const student_id = localStorage.getItem("id");
  const mentor_id = localStorage.getItem("mentor_id");
  const token = localStorage.getItem("token");

  // Fetch assigned mentor details
  const fetchMentor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/student/user/${mentor_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMentor(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch mentor details.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Fetch chat history with the mentor
  const fetchChatHistory = async () => {
    if (!mentor) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/mentor/fetchChat/${mentor_id}/${student_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChats(response.data.chat || []);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Auto-scroll function
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Fetch chat history initially and set up polling
  useEffect(() => {
    fetchMentor();
  }, []);

  useEffect(() => {
    if (mentor) fetchChatHistory();
  }, [mentor]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Polling for new messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (mentor) fetchChatHistory();
    }, 3000);
    return () => clearInterval(interval);
  }, [mentor]);

  // Send message to mentor
  const sendMessage = async () => {
    if (!message.trim() || !mentor) return;

    const newMessage = { userType: "student", msg: message };

    try {
      await axios.post(
        `http://localhost:5000/api/mentor/addChatMessage`,
        {
          mentor_id,
          user_id: student_id,
          userType: "student",
          msg: message,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setChats((prev) => [...prev, newMessage]);
      setMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] w-full bg-white shadow-xl rounded-2xl border border-gray-200 overflow-y-auto">
      {/* Mentor Info */}
      <div className="w-1/3 border-r border-gray-300 p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
          <Users className="h-5 w-5 text-gray-600" /> Mentor
        </h3>

        {/* Mentor Details */}
        {mentor ? (
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-md font-medium">{mentor.name}</p>
            <p className="text-sm text-gray-600">{mentor.email}</p>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">No mentor assigned.</p>
        )}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col p-4 h-full">
        {mentor ? (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Chat with {mentor.name}</h3>

            {/* Scrollable Chat Messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto border border-gray-300 p-3 rounded-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {chats.length > 0 ? (
                chats.map((msg, index) => (
                  <p
                    key={index}
                    className={`font-thin p-2 m-1 rounded-md ${
                      msg.userType === "student"
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
            No mentor available for chat.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentPrivateChat;
