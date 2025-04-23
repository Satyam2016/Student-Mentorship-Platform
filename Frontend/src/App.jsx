import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "./Component/LandingPage";
import LoginPage from "./Component/LoginPage";
import MentorDashboard from "./Component/MentorDashboard";
import StudentDashboard from "./Component/StudentDashboard";
import AdminDashboard from "./Component/AdminDashboard";

// Mentor Components
import StudentList from "./Component/Mentor/StudentList";
import AddStudent from "./Component/Mentor/AddStudent";
import RemoveStudent from "./Component/Mentor/RemoveStudent";
import CreateMeeting from "./Component/Mentor/CreateMeeting";
import PrivateChat from "./Component/Mentor/PrivateChat";
import Announcement from "./Component/Mentor/Announcement";
import Material from "./Component/Mentor/Material";
import MentorInfoo from "./Component/Mentor/MentorInfo";

// Student Components
import UserInfo from "./Component/Student/UserInfo";
import MentorInfo from "./Component/Student/MentorInfo";
import StudyMaterial from "./Component/Student/StudyMaterial";
import StudentPrivateChat from "./Component/Student/PrivateChat";
import Schedule from "./Component/Student/Schedule";
import StudentAnnouncement from "./Component/Student/StudentAnnouncement";

// Admin Components
import Students from "./Component/Admin/Students";
import Mentors from "./Component/Admin/Mentors";
import AssignMentor from "./Component/Admin/AssignMentor";
import Analytics from "./Component/Admin/Analytics";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Mentor Routes */}
        <Route element={<PrivateRoute allowedRoles={["mentor"]} />}>
          <Route path="/mentor" element={<MentorDashboard />}>
            <Route index element={<MentorInfoo />} />
            <Route path="studentList" element={<StudentList />} />
            <Route path="add" element={<AddStudent />} />
            <Route path="remove" element={<RemoveStudent />} />
            <Route path="createmeeting" element={<CreateMeeting />} />
            <Route path="privatechat" element={<PrivateChat />} />
            <Route path="announcement" element={<Announcement />} />
            <Route path="material" element={<Material />} />
          </Route>
        </Route>

        {/* Protected Student Routes */}
        <Route element={<PrivateRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentDashboard />}>
            <Route index element={<UserInfo />} />
            <Route path="announcement" element={< StudentAnnouncement />} />
            <Route path="mentor" element={<MentorInfo />} />
            <Route path="material" element={<StudyMaterial />} />
            <Route path="privatechat" element={<StudentPrivateChat />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={< Students />} />
            <Route path="mentors" element={< Mentors />} />
            <Route path="assign-mentor" element={<AssignMentor />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
