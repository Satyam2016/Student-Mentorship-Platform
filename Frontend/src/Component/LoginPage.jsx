import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Signup Function
  const handleSignup = async () => {
    console.log("Signup Triggered");

    if (!name || !email || !password) {
      Swal.fire("Error", "Please fill in all fields!", "error");
      return;
    }

    const url = "/api/auth/signup";
    const payload = { name, email, password, role };

    try {
      const response = await fetch(`http://localhost:5000${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Data   ...", data)

      if (response.ok) {
        // Store token in localStorage
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("role", data.user.role);
        }

        Swal.fire("Success", data.message || "Signup successful!", "success").then(() => {
          window.location.href = "/login";
        });
      } else {
        Swal.fire("Error", data.message || "Signup failed!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again!", "error");
    }
  };

  // Login Function
  const handleLogin = async () => {
    console.log("Login Triggered");

    if (!email || !password) {
      Swal.fire("Error", "Please fill in all fields!", "error");
      return;
    }

    const url = "/api/auth/login";
    const payload = { email, password };

    try {
      const response = await fetch(`http://localhost:5000${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("role", data.user.role);
        }
        console.log(data)

        Swal.fire("Success", data.message || "Login successful!", "success").then(() => {
          window.location.href = data.user.role === "mentor" ? "/mentor" : "/student";
        });
      } else {
        Swal.fire("Error", data.message || "Login failed!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again!", "error");
    }
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

        {/* Role Selection (Only for Sign-Up) */}
        {!isLogin && (
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
        )}

        {/* Name Field (Only for Sign-Up) */}
        {!isLogin && (
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 p-3 border rounded-lg"
          />
        )}

        {/* Email and Password Inputs */}
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
        <Button
          onClick={isLogin ? handleLogin : handleSignup}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
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
