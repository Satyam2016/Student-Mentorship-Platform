import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Component/PrivateRoute";
import LandingPage from "./Component/LandingPage";
import LoginPage from "./Component/LoginPage";
import MentorDashboard from "./Component/MentorDashboard";
import StudentDashboard from "./Component/StudentDashboard";

// Mentor Components
import StudentList from "./Component/Mentor/StudentList";
import AddStudent from "./Component/Mentor/AddStudent";
import RemoveStudent from "./Component/Mentor/RemoveStudent";
import CreateMeeting from "./Component/Mentor/CreateMeeting";
import PrivateChat from "./Component/Mentor/PrivateChat";
import Announcement from "./Component/Mentor/Announcement";
import Material from "./Component/Mentor/Material";

// Student Components
import MentorList from "./Component/Student/MentorList";
import StudyMaterial from "./Component/Student/StudyMaterial";
import StudentPrivateChat from "./Component/Student/PrivateChat";
import Schedule from "./Component/Student/Schedule";

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
            <Route index element={<StudentList />} />
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
            <Route index element={<MentorList />} />
            <Route path="mentors" element={<MentorList />} />
            <Route path="material" element={<StudyMaterial />} />
            <Route path="privatechat" element={<StudentPrivateChat />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
