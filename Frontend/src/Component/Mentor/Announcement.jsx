import React, { useState, useEffect } from "react";
import axios from "axios";
import { Send, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Announcement = () => {
  const [post, setPost] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:5000/api/mentor";
  const mentor_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const name= localStorage.getItem("name")

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/fetchAnnouncement/${mentor_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(response.data);
    } catch (error) {
      toast.error("Failed to fetch announcements!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handlePost = async () => {
    if (!post.trim()) return toast.warning("Please enter some text!");
    try {
      const res = await axios.post(
        `${API_URL}/createAnnouncement/${mentor_id}`,
        { post, name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnnouncements([res.data.announcement, ...announcements]);
      setPost("");
      toast.success("Announcement posted!");
    } catch (error) {
      toast.error("Error posting announcement!");
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        📢 Announcements
      </h2>

      {/* Announcement Input */}
      <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
        <div className="flex gap-4 items-start">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Share an update..."
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <Button
                onClick={handlePost}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center transition"
              >
                <Send className="h-5 w-5 mr-2" /> Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-5" />

      {loading && <p className="text-center text-gray-500">Loading announcements...</p>}

      {/* Announcement List */}
      <div className="flex-1 overflow-auto space-y-4">
        {announcements.length === 0 && !loading ? (
          <p className="text-center text-gray-500">No announcements yet.</p>
        ) : (
          announcements.map((post) => <AnnouncementPost key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

/* Announcement Post Component */
const AnnouncementPost = ({ post }) => {
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState(post.reply || []);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const API_URL = "http://localhost:5000/api/mentor";
  const mentor_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const handleReply = async () => {
    if (!reply.trim()) return toast.warning("Please enter a reply!");
    try {
      const res = await axios.post(
        `${API_URL}/addReply/${mentor_id}/${post._id}`,
        { msg: reply, name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplies([...replies, res.data.replies.at(-1)]);
      setReply("");
      setShowReplyInput(false);
      toast.success("Reply added!");
    } catch (error) {
      toast.error("Error adding reply!");
    }
  };

  return (
    <div className="bg-white p-5 border  border-gray-300 rounded-lg shadow-md">
      {/* Post Header */}
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-900">{post.name || "Jane Doe"}</p>
          <span className="text-sm text-gray-500">{post.date} | {post.time}</span>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-900">{post.post}</p>
      {post.file && (
        <a href={post.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-2 block text-sm hover:text-blue-800">
          📎 View Attachment
        </a>
      )}

      {/* Reply Section */}
      <div className="mt-4">
        <Button
          className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
          variant="ghost"
          onClick={() => setShowReplyInput(!showReplyInput)}
        >
          <MessageCircle className="h-4 w-4" /> Reply
        </Button>

        {showReplyInput && (
          <div className="mt-2 flex items-start gap-3">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Write a reply..."
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button onClick={handleReply} className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 flex items-center transition">
                  <Send className="h-4 w-4 mr-2" /> Reply
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Replies Dropdown */}
        {replies.length > 0 && (
          <div className="mt-3">
            <Button variant="ghost" className="text-gray-600 flex items-center" onClick={() => setShowReplies(!showReplies)}>
              {showReplies ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} {showReplies ? "Hide Replies" : `Show Replies (${replies.length})`}
            </Button>
          </div>
        )}
        {showReplies && (
          <div className="max-h-[200px] overflow-y-auto mt-2 space-y-2">
            {replies.map((reply, index) => (
              <div key={index} className="p-2 bg-gray-100 border border-gray-200 rounded-lg text-sm">
                <p className="font-semibold text-gray-700">{reply.name }</p>
                <span className="text-xs text-gray-500">{reply.date} | {reply.time}</span>
                <p className="text-gray-800">{reply.msg}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
