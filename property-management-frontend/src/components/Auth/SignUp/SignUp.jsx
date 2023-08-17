import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { handleSignUp } from "../../../store/auth/auth";
import toast from "react-hot-toast";
const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const formRef = useRef();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSignUpForm = (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = formRef.current;
    if (formData.checkValidity() === false) {
      setLoading(false);
      event.stopPropagation();
    } else {
      const data = {
        firstName: formData["first_name"].value,
        lastName: formData["last_name"].value,
        userRole: formData["role"].value,
        email: formData["email"].value,
        password: formData["password"].value,
        username: formData["username"].value,
      };

      dispatch(handleSignUp(data))
        .then((response) => {
          toast.success("Signed Up  Successfully");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("Something went wrong");
          setLoading(false);
        });
    }

    setValidated(true);
  };
  return (
    <div className="signup-form-container">
      <Form
        noValidate
        validated={validated}
        ref={formRef}
        onSubmit={(e) => handleSignUpForm(e)}
      >
        <div className="row">
          <div className="col-sm">
            <Form.Group className="mb-4" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="first_name"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a first name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                name="username"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a user name.
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-sm">
            <Form.Group className="mb-4" controlId="formBasicSecondName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="last_name"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a first name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-sm">
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Check
                name="role"
                type="radio"
                label="CUSTOMER"
                value={"CUSTOMER"}
                required
              />
              <Form.Check
                name="role"
                type="radio"
                label="OWNER"
                value={"OWNER"}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a role.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>
        <Button variant="primary" type="submit" disabled={loading}>
          Sign Up
        </Button>
        <div className="signUp-section">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};
export default SignUp;
