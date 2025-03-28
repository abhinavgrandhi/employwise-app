// Modified Login component with both styling and functional fixes
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      navigate("/users");
    } catch (err) {
      setError(err.message || "Login failed"); // Ensure proper error handling
    }
  };

  return (
    <Container className="login-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        {error && (
          <Alert 
            variant="danger" 
            dismissible 
            onClose={() => setError("")} // Add close handler
            className="auth-alert"
          >
            {error}
          </Alert>
        )}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-4">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
              autoFocus // Add auto focus
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </Form.Group>
          <Button 
            variant="primary" 
            className="auth-btn"
            type="submit"
          >
            Sign In
          </Button>
        </Form>
      </div>

      <style>{`
        .login-container {
          max-width: 500px;
          padding: 4rem 1rem;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 4px 25px rgba(0,0,0,0.06);
          width: 100%;
        }
        .auth-title {
          color: #2a2a72;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
          font-size: 2rem;
        }
        .auth-input {
          border: 2px solid #ececec;
          border-radius: 8px;
          padding: 0.75rem 1.25rem;
          transition: all 0.2s ease;
          font-size: 1rem;
        }
        .auth-input:focus {
          border-color: #2a2a72;
          box-shadow: 0 0 0 3px rgba(42,42,114,0.1);
        }
        .auth-btn {
          background: #2a2a72;
          border: none;
          padding: 1rem;
          width: 100%;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 1.1rem;
        }
        .auth-btn:hover {
          background: #3d3d99;
          transform: translateY(-2px);
        }
        .auth-alert {
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        @media (max-width: 576px) {
          .auth-card {
            padding: 1.5rem;
          }
          .auth-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </Container>
  );
}

export default Login;