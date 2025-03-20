import { useState } from "react";
import {
  BookOpen
} from 'lucide-react';



export default function LoginPage() {
  const [role, setRole] = useState("student");

  const handleLogin = () => {
    console.log("Clicked login...");
    window.location.href = "http://localhost:5000/auth/google";
  };


  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Website Logo and Name */}

      <div className="flex items-center gap-2 m-6" >
      <BookOpen className="h-8 w-8 text-blue-600" />
      <span className="text-xl font-bold"><h2>The Student Mentorship Platform</h2></span>
    </div>

      {/* Login Card */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <p className="text-center text-gray-600">Sign in to continue</p>

        {/* Radio Button Selection */}
        <div className="flex justify-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Student</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="mentor"
              checked={role === "mentor"}
              onChange={() => setRole("mentor")}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">Mentor</span>
          </label>
        </div>

        {/* Google Login Button */}
        <button
          className="flex items-center justify-center w-full px-4 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={(handleLogin)}
        >
          <img
            src="https://t3.ftcdn.net/jpg/05/18/09/32/360_F_518093233_bYlgthr8ZLyAUQ3WryFSSSn3ruFJLZHM.jpg"
            alt="Google Logo"
            className="w-6 h-6 mr-3"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
