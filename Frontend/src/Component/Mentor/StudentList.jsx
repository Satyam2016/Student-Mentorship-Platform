import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudentList = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState(""); 
  const mentor_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // ✅ Delete Student Function
  const deleteStudent = async (user_id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:5000/api/mentor/mentor/${mentor_id}/student/${user_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Removed!",
            text: "Student has been deleted.",
            icon: "success",
            showConfirmButton: false,
          });

          setUsers(users.filter((user) => user._id !== user_id));
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to remove student.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  // ✅ Fetch Students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/mentor/studentList/${mentor_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch students.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add Student
  const addStudent = async () => {
    if (!email)
      return Swal.fire({
        title: "Warning!",
        text: "Please enter an email.",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/mentor/addStudent/${email}/${mentor_id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers([...users, response.data]);
      setEmail("");
      setShowInput(false);
      window.location.reload()

      Swal.fire({
        title: "Success!",
        text: "Student added successfully!",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add student.",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="bg-sky-950 h-screen w-full p-7">
      <div className="flex md:items-center flex-col md:flex-row gap-5 md:gap-2 justify-between">
        <div className="flex flex-col gap-2 items-start text-white">
          <h3 className="text-lg font-semibold">Student List</h3>
        </div>

        {/* Add Student Button */}
        <div>
          <Button
            variant="outline"
            className="bg-transparent text-white"
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? "Cancel" : "Add Student"}
          </Button>
        </div>
      </div>

      {/* Input Field for Email */}
      {showInput && (
        <div className="mt-3 flex gap-3">
          <Input
            type="email"
            placeholder="Enter student email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-80 px-3 py-2 rounded-lg"
          />
          <Button onClick={addStudent} className="bg-blue-600 text-white">
            Submit
          </Button>
        </div>
      )}

      {/* Student Table */}
      <div className="mt-5">
        <Table>
          <TableHeader>
            <TableRow>
              {["User", "Email", "Action"].map((item, index) => (
                <TableHead key={index} className="py-5 text-white font-medium">
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id} className="text-white font-medium">
                  <TableCell className="py-5 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.img} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{user.name}</p>
                  </TableCell>
                  <TableCell className="py-5">{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="bg-transparent text-white"
                      onClick={() => deleteStudent(user._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td className="text-white text-2xl text-center py-5" colSpan={3}>
                  No students enrolled.
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentList;
