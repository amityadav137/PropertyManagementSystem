import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  redirect,
  useNavigate,
  useLocation,
  Link,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetUserPassword } from "../../../store/auth/auth";
import { isJwtExpired } from "jwt-check-expiration";
import PasswordChecklist from "react-password-checklist";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const formRef = useRef();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  useEffect(() => {
    console.log("isExpired is:", isJwtExpired(token));
  }, []);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = formRef.current;
    if (formData.checkValidity() === false) {
      setLoading(false);
      e.preventDefault();
      e.stopPropagation();
    } else {
      const password = formData["password"].value;

      dispatch(resetUserPassword({ password: password, username: "" }, token))
        .then((response) => {
          setLoading(false);
          navigate("/login");
          toast.success("Password reset successfully");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
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
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={password}
            valueAgain={passwordAgain}
            onChange={(isValid) => {
              setLoading(!isValid);
            }}
          />
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              required
              placeholder="Confirm Password"
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a confirm password.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            Reset Password
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ResetPassword;
