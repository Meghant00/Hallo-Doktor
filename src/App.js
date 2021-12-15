import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Appointments from "./components/appointments";
import Contact from "./components/contact";
import Doctors from "./components/doctors";
import Home from "./components/home";
import NavBar from "./components/nav-bar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor" element={<Doctors />} />
        <Route path="/appointment" element={<Appointments />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
