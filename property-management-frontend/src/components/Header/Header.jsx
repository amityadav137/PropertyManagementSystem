import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { useSelector } from "react-redux";
import { Button, NavDropdown } from "react-bootstrap";
import UserIconImage from "../../assets/icons/user.png"
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md"

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuthenticated = AuthService.isAuthenticated();
  const userDetail = useSelector((state) => state.auth.user_detail);
  function logout() {
    AuthService.logout();
    navigate("/");
  }
  return (
    <React.Fragment>
      {pathname != "/login" && pathname != "/sign-up" && (
        <header className="App-header">
          <Navbar>
            <Container>
              <Navbar.Brand href="/">SRNA</Navbar.Brand>
              <Nav>
                {/* <Nav.Link to="/">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </Nav.Link> */}
                {isAuthenticated && userDetail.role === "OWNER" && (
                  <>
                    <Nav.Link>
                      <Link to="owner/dashboard" className="nav-link">
                        Dashboard
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="my-properties" className="nav-link">
                        My Properties
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="properties-offers" className="nav-link">
                        Offers
                      </Link>
                    </Nav.Link>
                  </>
                )}

                {isAuthenticated && userDetail.role === "CUSTOMER" && (
                  <React.Fragment>
                    <Nav.Link>
                      <Link to="my-applications" className="nav-link">
                        My Applications
                      </Link>
                    </Nav.Link>

                    <Nav.Link>
                      <Link to="my-favorites" className="nav-link">
                        My Favorites
                      </Link>
                    </Nav.Link>
                  </React.Fragment>
                )}
                {isAuthenticated && userDetail.role === "ADMIN" && (
                  <React.Fragment>
                    <Nav.Link>
                      <Link to="admin/dashboard" className="nav-link">
                        Dashboard
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="users" className="nav-link">
                        Users
                      </Link>
                    </Nav.Link>
                  </React.Fragment>
                )}
              </Nav>
              <Nav>
                {isAuthenticated ? (
                  <>
                    <NavDropdown title={<img src={UserIconImage} width={30} height={30} />}
                      id='basic-nav-dropdown'>
                      <NavDropdown.Item>Hi {userDetail.username}</NavDropdown.Item>
                      <NavDropdown.Item>
                        <div>
                          <Nav.Link
                            onClick={() => {
                              logout();
                            }}
                          >
                            <span className="logout-icon"><MdOutlineLogout size={20} color={"#044663"} /></span>Logout
                          </Nav.Link>
                        </div>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <Nav.Link>
                    <Link to="login" className="nav-link">
                      <Button className="login-btn" variant="outline-primary">
                        <span className="content">Log In</span></Button>
                    </Link>
                  </Nav.Link>
                )}
                {/* {isAuthenticated && (
                  <div>
                    <Nav.Link
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </Nav.Link>
                  </div>
                )} */}
              </Nav>
            </Container>
          </Navbar>
        </header>
      )}
    </React.Fragment>
  );
}
