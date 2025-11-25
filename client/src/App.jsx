import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AddIdea from "./pages/AddIdea";
import EditIdea from "./pages/EditIdea";
import Contributor from "./pages/Contributor";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-idea" element={<AddIdea />} />
        <Route path="/edit-idea/:id" element={<EditIdea />} />
        <Route path="/contributors/:id" element={<Contributor />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
