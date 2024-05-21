import { Form, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Swal from "sweetalert2";
import "../../assets/css/App.css";

export default function Login() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  function authenticate(e) {
    e.preventDefault();
    fetch("http://localhost:4004/b4/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          retrieveUserDetails(data.access_token);
          Swal.fire({
            title: "Login Successful",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "swal-custom",
            },
          });
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            showConfirmButton: false,
            text: "Check your login details and try again",
            timer: 1500,
            customClass: {
              popup: "swal-custom",
            },
          });
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred during login. Please try again later.",
        });
      });
    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch("http://localhost:4004/b4/users/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
        });
      })
      .catch((error) => {
        console.error("Fetch User Details Error:", error);
      });
  };

  useEffect(() => {
    setIsActive(email !== "" && password !== "");
  }, [email, password]);

  const handleSignUp = () => {
    navigate("/register");
  };

  return user.id ? (
    <Navigate to="/products" />
  ) : (
    <Form onSubmit={authenticate} className="centered-form centered-form-login">
      <h1 className="mb-5 text-center">Zuitt Booking</h1>
      <Form.Group controlId="userEmail" className="form-fields">
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="password" className="form-fields">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Container className="d-flex">
        <Button
          variant="primary"
          type="button"
          id="signUpBtn"
          className="d-flex me-auto"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        <Button
          variant={isActive ? "primary" : "dark"}
          type="submit"
          id="loginBtn"
          className="d-flex ms-auto"
          disabled={!isActive}
        >
          Login
        </Button>
      </Container>
    </Form>
  );
}
