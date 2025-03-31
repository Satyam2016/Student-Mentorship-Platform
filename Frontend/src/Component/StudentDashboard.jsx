import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  MessageCircle,
  Calendar,
  Bell,
  Menu,
  ChevronDown,
  Search,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const studentLinks = [
  { title: "Dashboard", path: "/student", icon: Home },
  { title: "Mentor Detail", path: "/student/mentor", icon: Users },
  { title: "Study Material", path: "/student/material", icon: FileText },
  { title: "Announcement", path: "/student/announcement", icon: FileText },
  { title: "Private Chat", path: "/student/privatechat", icon: MessageCircle },
  { title: "Schedule", path: "/student/schedule", icon: Calendar },
];

const StudentDashboard = () => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Sidebar */}
      <div
        className={`fixed lg:static bg-black/80 z-50 lg:bg-zinc-900 transition-all duration-300 ease-in-out ${
          toggle ? "w-[260px]" : "w-0 lg:w-[260px]"
        } h-screen overflow-hidden`}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setToggle(false)}
          className="absolute top-3 right-3 lg:hidden text-white text-xl"
        >
          ✖
        </Button>

        {/* Sidebar Content */}
        <div className="p-5 text-white">
          <div className="flex items-center gap-2 text-xl font-bold">
            <MessageCircle /> SMP
          </div>

          <nav className="mt-6 space-y-1">
            {studentLinks.map((link, index) => (
              <Link
                key={index}
                className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-300 hover:bg-blue-600 hover:text-white transition"
                to={link.path}
              >
                <link.icon className="h-5 w-5" />
                {link.title}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="mt-4 bg-gray-500" />

        {/* Logout */}
        <div className="p-5">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center gap-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setToggle(true)}
              variant="ghost"
              size="icon"
              className="lg:hidden"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
            <form className="relative w-full max-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="Search" className="pl-10" />
            </form>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-xs">2</Badge>
            </div>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
                    <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-black">{name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-40 p-2 bg-white shadow-md rounded-md">
                <button
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Separator />

        {/* Page Content */}
        <div className="m-4 p-4 bg-white rounded-md shadow-md flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;