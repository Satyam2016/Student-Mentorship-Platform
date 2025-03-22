import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  BookOpen,
  Home,
  Users,
  FileText,
  MessageCircle,
  Calendar,
  Bell,
  Menu,
  ChevronDown,
  Search,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const studentLinks = [
  { title: "Dashboard", path: "/student", icon: Home },
  { title: "Mentors", path: "/student/mentors", icon: Users },
  { title: "Study Material", path: "/student/material", icon: FileText },
  { title: "Private Chat", path: "/student/privatechat", icon: MessageCircle },
  { title: "Schedule", path: "/student/schedule", icon: Calendar },
];

const StudentDashboard = () => {
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-screen">
      {/* Sidebar */}
      <div
        className={`lg:block absolute lg:static bottom-0 left-0 top-0 right-0 bg-black/70 z-10 lg:bg-transparent transition-all duration-200 ease-in-out ${
          toggle ? "block" : "hidden"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setToggle(false)}
          className="block lg:hidden absolute left-[360px] top-3 text-white text-3xl z-20"
        >
          ✖
        </Button>

        <div className="absolute lg:relative lg:block w-[350px] lg:w-[256px] h-screen bg-zinc-900 pt-5 pb-4">
          {/* Logo */}
          <div className="relative flex items-center font-semibold italic text-white pl-5">
            <BookOpen className="mr-2" /> SMP
          </div>

          {/* Sidebar Navigation */}
          <div className="mt-6 mb-2 py-2 px-3">
            <nav className="grid gap-1.5">
              {studentLinks.map((link, index) => (
                <Link
                  key={index}
                  className={`flex items-center hover:bg-[#1F2937] hover:text-white px-2.5 py-2 rounded-md font-medium text-lg ${
                    link.title === "Dashboard" ? "bg-[#1F2937] text-white" : "text-gray-400"
                  }`}
                  to={link.path}
                >
                  <link.icon className="mr-2.5 h-6 w-6" />
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>

          <Separator className="bg-gray-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen w-full flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center py-3 px-2">
          <Button onClick={() => setToggle(true)} variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6 text-muted-foreground" />
          </Button>
          <Separator orientation="vertical" className="lg:hidden mx-4 h-6" />
          <div className="flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-1 lg:left-2 top-1.5 h-6 w-6 text-muted-foreground" />
                <Input placeholder="Search" className="pl-10" />
              </div>
            </form>
          </div>
          <div className="relative">
            <Bell className="h-6 w-6 text-muted-foreground" />
            <Badge className="absolute top-0 right-0 w-3 h-3 p-0 bg-red-500">2</Badge>
          </div>
          <Separator orientation="vertical" className="mx-4 h-6" />
          <Popover open={open} onOpenChange={setOpen}>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2 px-3 py-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
                  <AvatarFallback className="text-sm font-medium">JD</AvatarFallback>
                </Avatar>
                <span className="font-medium text-black">Jane Doe</span>
              </Button>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2"
                  onClick={() => setOpen(!open)}
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </PopoverTrigger>
            </div>

            <PopoverContent align="end" className="w-40 p-2 bg-white shadow-md rounded-md">
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md">
                Logout
              </button>
            </PopoverContent>
          </Popover>
        </div>
        <Separator />

        {/* Main Content */}
        <div className="m-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
