import React, { useState } from "react";
import { Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const students = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Davis" },
  { id: 4, name: "Diana Lee" },
  { id: 5, name: "Ethan Brown" },
  { id: 6, name: "Fiona Miller" },
  { id: 7, name: "George White" },
  { id: 8, name: "Hannah Scott" },
  { id: 9, name: "Isaac King" },
  { id: 10, name: "Jackie Adams" },
];

const PrivateChat = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [chats, setChats] = useState({});
  const [message, setMessage] = useState("");

  const selectStudent = (student) => {
    setSelectedStudent(student);
    if (!chats[student.id]) {
      setChats((prev) => ({ ...prev, [student.id]: [] }));
    }
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedStudent) return;
    setChats((prev) => ({
      ...prev,
      [selectedStudent.id]: [...(prev[selectedStudent.id] || []), { text: message, sender: "You" }],
    }));
    setMessage("");
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
          {students.map((student) => (
            <li
              key={student.id}
              className={`p-2 cursor-pointer rounded-lg ${
                selectedStudent?.id === student.id ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => selectStudent(student)}
            >
              {student.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col p-4 h-full">
        {selectedStudent ? (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Chat with {selectedStudent.name}</h3>

            {/* Scrollable Chat Messages */}
            <div className="flex-1 overflow-y-auto border border-gray-300 p-3 rounded-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {chats[selectedStudent.id]?.length > 0 ? (
                chats[selectedStudent.id].map((msg, index) => (
                  <p
                    key={index}
                    className={`font-thin p-2 m-1 rounded-md ${
                      msg.sender === "You" ? "bg-blue-500 w-fit text-white self-end ml-auto" : "bg-gray-200 text-gray-700 w-fit"
                    }`}
                  >
                    {msg.text}
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
