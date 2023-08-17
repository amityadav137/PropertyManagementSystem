import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { redirect, useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetLink } from "../../../store/auth/auth";

const ForgotPassword = () => {
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
      const username = formData["username"].value;

      dispatch(sendPasswordResetLink(username))
        .then((response) => {
          setLoading(false);
          formRef.current.reset();

          toast.success("Password reset link sent successfully");
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Something went wrong");
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
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              required
              placeholder="Enter username"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            Send
          </Button>
          <div className="back-to-login">
            Know your password? <Link to="/login">Login</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
