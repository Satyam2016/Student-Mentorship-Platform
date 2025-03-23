import React from "react";
import { Button } from "@/components/ui/button";
import {
     Table,
     TableHeader,
     TableRow,
     TableBody,
     TableHead,
     TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudentList = () => {
     const users = [
          {
               name: "John Doe",
               job: "Sous Chef",
               img: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.1412446893.1705017600&semt=ais",
               email: "johndoe@example.com",
               status: "Compeleted",
          },
          {
               name: "Victoria Bright",
               job: "Data Analyst",
               img: "https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.jpg?b=1&s=612x612&w=0&k=20&c=7hgSq1L2mpIbpuuw00KELApMpmZfBkZ-RBxn3Qps5zQ=",
               email: "victoriabright@example.com",
               status: "Rejected",
          },
          {
               name: "David Wilson",
               job: "Plumber",
               img: "https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
               email: "davidwildon@example.com",
               status: "Pending",
          },
          {
               name: "Joy Fred",
               job: "Teacher",
               img: "https://www.high-profile.com/wp-content/uploads/2020/06/Morgan-Doherty-headshot.jpg",
               email: "joyfred@example.com",
               status: "Pending",
          },
          {
               name: "Peter Paul",
               job: "Engineer",
               img: "https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=",
               email: "peterpaul@example.com",
               status: "Completed",
          },
          {
               name: "Matt Wolf",
               job: "Writer",
               img: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
               email: "mattwolf@example.com",
               status: "Rejected",
          },
     ];

     const headData = ["User", "Email", , "Action"];

     return (
          <ScrollArea className="h-3/4 w-aut rounded-md border">
               <div className="bg-sky-950 h-screen w-full p-7">
                    <div className="flex md:items-center flex-col md:flex-row gap-5 md:gap-2 justify-between">
                         <div className="flex flex-col gap-2 items-start text-white">
                              <h3 className="text-lg font-semibold">Student List</h3>
                         
                         </div>

                         <div>
                              <Button variant="outline" className="bg-transparent text-white">
                                   Add Student
                              </Button>
                         </div>
                    </div>

                    <div className="mt-5">
                         <Table>
                              <TableHeader>
                                   <TableRow>
                                        {headData.map((item, index) => {
                                             return (
                                                  <TableHead key={index} className="py-5">
                                                       <p
                                                            className={`text-white font-medium text-lg ${item === "Occupation" || item === "Email"
                                                                      ? "hidden md:block"
                                                                      : "block "
                                                                 }`}
                                                       >
                                                            {item}
                                                       </p>
                                                  </TableHead>
                                             );
                                        })}
                                   </TableRow>
                              </TableHeader>
                              <TableBody>
                                   {users?.map((user) => (
                                        <TableRow key={user.name} className="text-white font-medium">
                                             <TableCell className="py-5 flex items-center gap-3">
                                                  <Avatar>
                                                       <AvatarImage src={user.img} alt={user.name} />
                                                       <AvatarFallback>CN</AvatarFallback>
                                                  </Avatar>
                                                  <p className="font-medium">{user.name}</p>
                                             </TableCell>

                                        

                                             <TableCell className="py-5">
                                                  <p className="hidden md:block">{user.email}</p>
                                             </TableCell>


                                             <TableCell className="">
                                                  <Button
                                                       variant="outline"
                                                       className="bg-transparent text-white"
                                                  >
                                                      Remove
                                                  </Button>
                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>
                    </div>
               </div>
          </ScrollArea>
     );
};

export default StudentList;
