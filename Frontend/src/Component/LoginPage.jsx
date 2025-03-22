import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    // Authentication logic here
    console.log(isLogin ? "Logging in" : "Signing up", { email, password, role });
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Logo and Name */}
      <div className="flex items-center gap-2 m-6">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <h2 className="text-xl font-bold">The Student Mentorship Platform</h2>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <p className="text-center text-gray-600">
          {isLogin ? "Sign in to continue" : "Create an account"}
        </p>

        {/* Role Selection */}
        { !isLogin && 
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

        }

        {/* Email and Password */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
        />

        {/* Submit Button */}
        <Button onClick={handleAuth} className="w-full bg-blue-600 text-white py-3 rounded-lg">
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        {/* Toggle between Login & Signup */}
        <p className="text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
