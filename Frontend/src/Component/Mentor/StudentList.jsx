import React, { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableBody, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const StudentList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [email, setEmail] = useState("")
  const mentor_id = localStorage.getItem("id")
  const token = localStorage.getItem("token")

  // ✅ Delete Student
  const deleteStudent = async (user_id) => {
    try {
      const result = await Swal.fire({
        title: "Remove student?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6"
      })
      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:5000/api/mentor/mentor/${mentor_id}/student/${user_id}`, { headers: { Authorization: `Bearer ${token}` } })
        if (response.status === 200) {
          setUsers(users.filter((user) => user._id !== user_id))
          Swal.fire({ title: "Removed", text: "Student has been deleted.", icon: "success", timer: 2000, showConfirmButton: false })
        }
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "Failed to remove student.", icon: "error", timer: 1500, showConfirmButton: false })
    }
  }

  // ✅ Fetch Students
  const fetchStudents = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5000/api/mentor/studentList/${mentor_id}`, { headers: { Authorization: `Bearer ${token}` } })
      setUsers(response.data)
    } catch (error) {
      Swal.fire({ title: "Error", text: "Failed to fetch students.", icon: "error", timer: 1500, showConfirmButton: false })
    } finally {
      setLoading(false)
    }
  }

  //  Add Student
  const addStudent = async () => {
    if (!email) return Swal.fire({ title: "Enter Email", text: "Please provide a valid email.", icon: "warning", timer: 1500, showConfirmButton: false })
    setLoading(true)
    try {
      const response = await axios.post(`http://localhost:5000/api/mentor/addStudent/${email}/${mentor_id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
      setUsers([...users, response.data])
      setEmail("")
      setShowInput(false)
      window.location.reload();
      Swal.fire({ title: "Success", text: "Student added successfully!", icon: "success", timer: 2000, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ title: "Error", text: "Failed to add student.", icon: "error", timer: 1500, showConfirmButton: false })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div className="min-h-[600px] bg-gray-50 flex flex-col items-center px-6 py-8 ">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Student List</h2>
          <Button variant="outline" className="text-sm px-4" onClick={() => setShowInput(!showInput)}>
            {showInput ? "Cancel" : "Add Student"}
          </Button>
        </div>

        {/* Input Field */}
        {showInput && (
          <div className="flex gap-3 items-center mb-5">
            <Input type="email" placeholder="Enter student email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
            <Button onClick={addStudent} className="bg-blue-600 text-white">Add</Button>
          </div>
        )}

        {/* Student Table */}
        <div className="overflow-hidden rounded-lg shadow-md bg-white">
          <Table className="w-full text-sm">
            <TableHeader className="bg-gray-100 text-gray-600">
              <TableRow>
                <TableHead className="py-3 px-5">User</TableHead>
                <TableHead className="py-3 px-5">Email</TableHead>
                <TableHead className="py-3 px-5 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id} className="hover:bg-gray-50">
                    <TableCell className="py-4 px-5 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.img} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-700">{user.name}</p>
                    </TableCell>
                    <TableCell className="py-4 px-5 text-gray-600">{user.email}</TableCell>
                    <TableCell className="py-4 px-5 text-right">
                      <Button variant="ghost" className="text-red-500 hover:bg-red-100" onClick={() => deleteStudent(user._id)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-gray-500">No students enrolled.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default StudentList
