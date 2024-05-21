import { useContext } from "react";
import { useLocation as useReactRouterLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Navbar, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { IoPersonAddSharp, IoPerson, IoLogInOutline } from "react-icons/io5";
import { Row, Col } from "react-bootstrap";

export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const reactRouterLocation = useReactRouterLocation();

  return (
    <>
      <Navbar expand="lg" className="bg-light">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            HomeDeco
          </Navbar.Brand>

          {reactRouterLocation.pathname.includes("/products") && (
            <Container className="search-container">
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Form className="d-flex align-items-center w-100 mt-2">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="dark">Search</Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          )}

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" exact="true">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="b4/products" exact="true">
                Products
              </Nav.Link>
              {user.isAdmin && (
                <Nav.Link as={Link} to="/courses/addCourse" exact="true">
                  Add Course
                </Nav.Link>
              )}

              {user.id !== null ? (
                <>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-top">Profile</Tooltip>}
                  >
                    <Nav.Link as={Link} to="/profile">
                      <IoPerson size={20} />
                    </Nav.Link>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-top">Logout</Tooltip>}
                  >
                    <Nav.Link as={Link} to="/logout">
                      <IoLogInOutline size={25} />
                    </Nav.Link>
                  </OverlayTrigger>
                </>
              ) : (
                <>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-top">Login</Tooltip>}
                  >
                    <Nav.Link as={Link} to="/login">
                      <IoPersonAddSharp size={20} />
                    </Nav.Link>
                  </OverlayTrigger>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Bottom Navbar - Show only if location contains /products */}
    </>
  );
}
