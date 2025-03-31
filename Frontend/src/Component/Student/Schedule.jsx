import React, { useEffect, useState } from "react"
import { History, Calendar } from "lucide-react"
import Swal from "sweetalert2"

const Schedule = () => {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("mentor_id")

  const fetchMeetings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/mentor/fetchMeeting/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      })
      if (!response.ok) throw new Error("Failed to fetch meetings")
      const data = await response.json()
      setMeetings(data)
    } catch (error) {
      Swal.fire("Error!", error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMeetings()
  }, [userId])

  if (loading) return <p className="text-center text-gray-600">Loading meetings...</p>

  const currentDate = new Date()
  const pastMeetings = meetings.filter(meet => new Date(meet.date) < currentDate)
  const upcomingMeetings = meetings.filter(meet => new Date(meet.date) >= currentDate)

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Meetings</h2>

      {/* Upcoming Meetings */}
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Calendar className="h-6 w-6 text-green-600" /> Upcoming Meetings
        </h3>
        {upcomingMeetings.length > 0 ? (
          <ul className="space-y-3">
            {upcomingMeetings.map(meet => (
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
          <p className="text-gray-500 text-sm">No upcoming meetings.</p>
        )}
      </div>

      {/* Past Meetings */}
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <History className="h-6 w-6 text-gray-700" /> Past Meetings
        </h3>
        {pastMeetings.length > 0 ? (
          <ul className="space-y-3">
            {pastMeetings.map(meet => (
              <li key={meet._id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-gray-700">📌 {meet.title}</p>
                <p className="text-xs text-gray-500">📅 {meet.date} | ⏰ {meet.time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No past meetings.</p>
        )}
      </div>
    </div>
  )
}

export default Schedule;
