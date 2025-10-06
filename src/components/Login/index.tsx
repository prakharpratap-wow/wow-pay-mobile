import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Button, Input } from "reactstrap";
import axios from "axios";
import "./style.scss";
import { useAuth } from "../context/AuthContext";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(
        `https://wowpay-api.wowlabz.com/api/v1/merchants/auth/login`,
        payload
      );
      const data = response.data.data;
      console.log("Login Success:", response.data.data);
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      if (data.access_token) {
        login(data.access_token, data.refresh_token); // ✅ update context
        navigate("/home"); // navigate after context update
      }
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100 w-100">
      <Card className="auth-card shadow-sm p-4">
        <CardBody>
          <h4 className="text-center mb-4">Login</h4>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="mb-3"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="mb-3"
              required
            />
            <Button color="primary" block type="submit">
              Login
            </Button>
          </form>
          <div className="text-center mt-3 d-none">
            <small>
              Don't have an account?{" "}
              <span className="link-text" onClick={() => navigate("/signup")}>
                Sign Up
              </span>
            </small>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
