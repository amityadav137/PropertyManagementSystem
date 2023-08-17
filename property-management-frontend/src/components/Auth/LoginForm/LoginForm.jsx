import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { redirect, useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTokenAfterLogin,
  fetchUserDetail,
} from "../../../store/auth/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const formRef = useRef();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = formRef.current;
    if (formData.checkValidity() === false) {
      setLoading(false);
      e.preventDefault();
      e.stopPropagation();
    } else {
      const email = formData["email"].value;
      const password = formData["password"].value;

      dispatch(fetchTokenAfterLogin(email, password))
        .then((response) => {
          dispatch(fetchUserDetail());
          toast.success("Logged In Successfully");
          navigate(state?.path || "/");
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Invalid Credentials");
        });
    }

    setValidated(true);
  };
  return (
    <>
      <div className="form-container">
        <Form
          noValidate
          validated={validated}
          ref={formRef}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="email"
              required
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            Log In
          </Button>
          <div className="signUp-section">
            <p>
              Don't have an account? <Link to="/sign-up">Sign Up</Link>
            </p>
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot your Password?</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
