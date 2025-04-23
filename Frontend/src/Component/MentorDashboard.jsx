import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BookOpen,
  Home,
  CalendarPlus2,
  MessageCircle,
  Megaphone,
  FileText,
  Search,
  Bell,
  Menu,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mentorLinks = [
  { title: "Dashboard", path: "/mentor", icon: Home },
  { title: "Student List", path: "/mentor/studentList", icon: CalendarPlus2 },
  { title: "Create Meeting", path: "/mentor/createmeeting", icon: CalendarPlus2 },
  { title: "Private Chat", path: "/mentor/privatechat", icon: MessageCircle },
  { title: "Announcement", path: "/mentor/announcement", icon: Megaphone },
  { title: "Material", path: "/mentor/material", icon: FileText },
];

const MentorDashboard = () => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; 
  };

  return (
    <div className="flex min-h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed lg:relative bg-gray-900 h-screen lg:w-64 w-72 transition-all duration-200 ease-in-out ${toggle ? "block" : "hidden lg:flex"} z-20`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="text-white font-semibold italic text-lg flex items-center gap-2 p-5">
            <BookOpen className="h-6 w-6 text-indigo-400" /> SMP
          </div>

          {/* Navigation */}
          <nav className="mt-2 flex-1">
            {mentorLinks.map((link, index) => (
              <Link key={index} to={link.path} className="flex items-center px-5 py-3 text-gray-300 hover:bg-indigo-600 hover:text-white transition rounded-md">
                <link.icon className="mr-3 h-5 w-5" /> {link.title}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-5">
            <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center py-2">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <div className="fixed w-full lg:w-auto lg:relative flex items-center justify-between bg-white shadow px-5 py-3 z-10">
          <div className="flex items-center gap-2">
            <Button onClick={() => setToggle(!toggle)} variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
              <Input placeholder="Search..." className="pl-9 border-gray-300 rounded-full w-56 md:w-64 lg:w-72" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <Badge className="absolute top-0 right-0 w-3 h-3 p-0 bg-red-500">4</Badge>
            </div>

            <Popover open={open} onOpenChange={setOpen}>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                    <AvatarFallback className="text-sm font-medium">{name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-800">{name}</span>
                </Button>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-2">
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </PopoverTrigger>
              </div>
              <PopoverContent align="end" className="w-40 p-2 bg-white shadow-md rounded-md">
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md flex items-center">
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto mt-[60px] lg:mt-0 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
