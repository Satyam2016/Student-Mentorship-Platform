import React, { useEffect, useState } from "react";
import { Calendar, Clock, Users, Link, PlusCircle, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import Swal from "sweetalert2"; // Import SweetAlert

const CreateMeeting = () => {
  const [meeting, setMeeting] = useState({
    title: "",
    date: "",
    time: "",
    type: "Video Call",
    link: "",
  });

  const [previousMeetings, setPreviousMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const mentor_id = localStorage.getItem("id");

  const handleChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (value) => {
    setMeeting({ ...meeting, type: value });
  };

  const generateLink = () => {
    setMeeting({
      ...meeting,
      link: `https://meet.example.com/${Math.random().toString(36).substr(2, 8)}`,
    });
    Swal.fire("Link Generated!", "Your meeting link has been created.", "success");
  };

  const createMeeting = async () => {
    if (!meeting.title || !meeting.date || !meeting.time) {
      Swal.fire("Missing Fields!", "Please fill all required fields.", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/mentor/createMeeting/${mentor_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(meeting),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create meeting");
      }

      setPreviousMeetings([data.meeting, ...previousMeetings]);
      setMeeting({ title: "", date: "", time: "", type: "Video Call", link: "" });

      Swal.fire("Meeting Created!", "Your meeting has been scheduled.", "success");
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchMeeting = async () => {
    if (!mentor_id) {
      Swal.fire("Error!", "Mentor ID not found.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/mentor/fetchMeeting/${mentor_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch meetings");
      }

      const data = await response.json();
      setPreviousMeetings(data);
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeeting();
  }, [mentor_id]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Meeting Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4">📅 Schedule a Meeting</h2>

          <div className="mb-4">
            <label className="block font-semibold">Meeting Title</label>
            <Input type="text" name="title" placeholder="Enter title" value={meeting.title} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" /> Date
              </label>
              <Input type="date" name="date" value={meeting.date} onChange={handleChange} />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" /> Time
              </label>
              <Input type="time" name="time" value={meeting.time} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-4">
            <label className="font-semibold flex items-center gap-2">
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

          <div className="mb-4">
            <label className="font-semibold flex items-center gap-2">
              <Link className="h-5 w-5 text-blue-500" /> Meeting Link
            </label>
            <div className="flex gap-2">
              <Input type="text" value={meeting.link} readOnly placeholder="Generate a meeting link" />
              <Button onClick={generateLink} className="bg-blue-600 text-white">🔗 Generate</Button>
            </div>
          </div>

          <Button
            onClick={createMeeting}
            className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg flex items-center gap-2 justify-center"
            disabled={loading}
          >
            <PlusCircle className="h-6 w-6" />
            {loading ? "Creating..." : "Create Meeting"}
          </Button>
        </div>

        {/* Previous Meetings Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <History className="h-6 w-6 text-gray-700" /> Previous Meetings
          </h3>

          <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {previousMeetings.length > 0 ? (
              <ul className="space-y-3">
                {previousMeetings.map((meet) => (
                  <li key={meet._id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
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
    </div>
  );
};

export default CreateMeeting;
