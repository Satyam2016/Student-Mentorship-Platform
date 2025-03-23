import React, { useState } from "react";
import { Paperclip, Send, X, MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Announcement = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  const handlePost = () => {
    if (!text.trim()) return;

    const newPost = {
      id: Date.now(),
      text,
      file,
      date: new Date().toLocaleString(),
      replies: [], // Initialize replies as an empty array
    };

    setAnnouncements([newPost, ...announcements]);
    setText("");
    setFile(null);
  };

  const handleReply = (postId, replyText) => {
    if (!replyText.trim()) return;

    setAnnouncements((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, replies: [...post.replies, { text: replyText, date: new Date().toLocaleString() }] }
          : post
      )
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-5">
      {/* Announcement Input */}
      <div className="flex gap-3 items-start">
        <Avatar>
          <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <Input
            type="text"
            placeholder="Share something with your class..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* File Upload Section */}
          {file && (
            <div className="flex items-center bg-gray-100 p-2 mt-2 rounded-lg shadow-inner">
              <span className="text-gray-600 text-sm truncate w-48">{file.name}</span>
              <button className="ml-auto text-red-500 hover:text-red-700" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mt-3">
            <label className="cursor-pointer flex items-center text-blue-600 font-medium hover:underline">
              <Paperclip className="h-5 w-5 mr-2" />
              Attach File
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </label>

            <Button
              onClick={handlePost}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center transition"
            >
              <Send className="h-5 w-5 mr-2" /> Post
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-5" />

      {/* Announcement List */}
      <div className="space-y-5">
        {announcements.map((post) => (
          <AnnouncementPost key={post.id} post={post} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
};

/* Component for individual announcement posts */
const AnnouncementPost = ({ post, onReply }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
      {/* Post Header */}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-800">Jane Doe</p>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-800">{post.text}</p>
      {post.file && (
        <a
          href={URL.createObjectURL(post.file)}
          download={post.file.name}
          className="text-blue-600 underline mt-2 block text-sm font-medium hover:text-blue-800"
        >
          📎 {post.file.name}
        </a>
      )}

      {/* Reply Section */}
      <div className="mt-3">
        <button
          className="text-blue-500 flex items-center text-sm hover:underline"
          onClick={() => setShowReplyInput(!showReplyInput)}
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          Reply
        </button>

        {/* Reply Input */}
        {showReplyInput && (
          <div className="mt-2 flex gap-2">
            <Input
              type="text"
              placeholder="Write a reply..."
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <Button
              onClick={() => {
                onReply(post.id, replyText);
                setReplyText("");
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center transition"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Display Replies */}
        {post.replies.length > 0 && (
          <div className="mt-3 bg-gray-100 p-3 rounded-lg space-y-2">
            {post.replies.map((reply, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/45.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-700">{reply.text}</p>
                  <p className="text-xs text-gray-500">{reply.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
