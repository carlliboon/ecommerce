import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { UserProvider } from "./context/UserContext";
import AppNavbar from "./components/Layout/AppNavBar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./components/Authentication/Login";
import Logout from "./components/Authentication/Logout";
import Register from "./components/Authentication/Register";
import "./assets/css/App.css";

export default function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
    setUser({ id: null, isAdmin: null });
  };

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/products" element={<Products />} /> */}
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}
