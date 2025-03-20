import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Component/LandingPage";
import LoginPage from "./Component/LoginPage";
import MentorDashboard from "./Component/MentorDashboard";
import StudentList from "./Component/Mentor/StudentList";
import AddStudent from "./Component/Mentor/AddStudent";
import RemoveStudent from "./Component/Mentor/RemoveStudent";
import CreateMeeting from "./Component/Mentor/CreateMeeting";
import PrivateChat from "./Component/Mentor/PrivateChat";
import Announcemnet from "./Component/Mentor/Announcemnet";
import Material from "./Component/Mentor/Material";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Mentor Dashboard with nested routes */}
        <Route path="/mentor" element={<MentorDashboard />}>
          <Route index element={<StudentList />} /> 
          <Route path="add" element={<AddStudent />} />
          <Route path="remove" element={<RemoveStudent />} />
          <Route path="createmeeting" element={<CreateMeeting />} />
          <Route path="privatechat" element={<PrivateChat />} />
          <Route path="announcement" element={<Announcemnet />} />
          <Route path="material" element={<Material />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
