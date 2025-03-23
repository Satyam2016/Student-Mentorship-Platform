import React, { useState } from "react";
import { Calendar, Clock, Users, Link, PlusCircle, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const CreateMeeting = () => {
  const [meeting, setMeeting] = useState({
    title: "",
    date: "",
    time: "",
    type: "Video Call",
    link: "",
  });

  const [previousMeetings, setPreviousMeetings] = useState([
    {
      title: "Team Standup",
      date: "2025-03-20",
      time: "10:00 AM",
      type: "Video Call",
      link: "https://meet.example.com/abc123",
    },
    {
      title: "Project Discussion",
      date: "2025-03-19",
      time: "2:30 PM",
      type: "Audio Call",
      link: "https://meet.example.com/xyz456",
    },
    {
      title: "Client Review",
      date: "2025-03-18",
      time: "5:00 PM",
      type: "In-Person",
      link: "Meeting Room 3B",
    },
    {
      title: "Weekly Sync",
      date: "2025-03-17",
      time: "11:00 AM",
      type: "Video Call",
      link: "https://meet.example.com/qwe789",
    },
    {
      title: "Brainstorming Session",
      date: "2025-03-16",
      time: "4:00 PM",
      type: "Audio Call",
      link: "https://meet.example.com/zxc321",
    },
  ]);

  const handleChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (value) => {
    setMeeting({ ...meeting, type: value });
  };

  const generateLink = () => {
    setMeeting({ ...meeting, link: `https://meet.example.com/${Math.random().toString(36).substr(2, 8)}` });
  };

  const createMeeting = () => {
    if (meeting.title && meeting.date && meeting.time) {
      setPreviousMeetings([meeting, ...previousMeetings]);
      setMeeting({ title: "", date: "", time: "", type: "Video Call", link: "" });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-200 transition-all duration-300">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3 text-left">Schedule a Meeting</h2>

      {/* Meeting Form */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        {/* Meeting Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Meeting Title</label>
          <Input
            type="text"
            name="title"
            placeholder="Enter meeting title"
            className="w-full"
            value={meeting.title}
            onChange={handleChange}
          />
        </div>

        {/* Date & Time */}
        <div className="flex gap-4 mb-4">
          {/* Date Picker */}
          <div className="w-1/2">
            <label className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" /> Date
            </label>
            <Input type="date" name="date" value={meeting.date} onChange={handleChange} className="w-full" />
          </div>

          {/* Time Picker */}
          <div className="w-1/2">
            <label className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" /> Time
            </label>
            <Input type="time" name="time" value={meeting.time} onChange={handleChange} className="w-full" />
          </div>
        </div>

        {/* Meeting Type Dropdown */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" /> Meeting Type
          </label>
          <Select value={meeting.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full">{meeting.type}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Video Call">🎥 Video Call</SelectItem>
              <SelectItem value="Audio Call">🎙 Audio Call</SelectItem>
              <SelectItem value="In-Person">🏢 In-Person</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Meeting Link Generator */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold mb-1 flex items-center gap-2">
            <Link className="h-5 w-5 text-blue-500" /> Meeting Link
          </label>
          <div className="flex gap-2">
            <Input type="text" value={meeting.link} readOnly placeholder="Generate a meeting link" className="w-full" />
            <Button onClick={generateLink} className="bg-blue-600 text-white hover:bg-blue-700">
              🔗 Generate
            </Button>
          </div>
        </div>

        {/* Create Meeting Button */}
        <Button
          onClick={createMeeting}
          className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg py-3 rounded-lg flex items-center gap-2 justify-center"
        >
          <PlusCircle className="h-6 w-6" />
          Create Meeting
        </Button>
      </div>

      {/* Previous Meetings Section (Scrollable) */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <History className="h-6 w-6 text-gray-700" />
          Previous Meetings
        </h3>

        <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {previousMeetings.length > 0 ? (
            <ul className="space-y-3">
              {previousMeetings.map((meet, index) => (
                <li key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-sm font-medium text-gray-700">📌 {meet.title}</p>
                  <p className="text-xs text-gray-500">📅 {meet.date} | ⏰ {meet.time}</p>
                  {meet.type !== "In-Person" ? (
                    <a href={meet.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                      🔗 Join Meeting
                    </a>
                  ) : (
                    <p className="text-xs text-gray-500">📍 {meet.link}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No previous meetings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
