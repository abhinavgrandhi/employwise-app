import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../services/userService";
import { Container, Form, Button, Alert } from "react-bootstrap";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await getUserById(id);
      setUser(data);
    } catch (error) {
      setMessage("Error loading user.");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateUser(id, user);
      setMessage("User updated successfully!");

      console.log("EditUser - Updated Data:", updatedData); 
      setTimeout(() => {
        navigate("/users", { state: { updatedUser: updatedData } });
      }, 1000);
    } catch (error) {
      setMessage("Error updating user.");
    }
  };

  return (
    <Container>
      <h2>Edit User</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit">Update User</Button>
      </Form>
    </Container>
  );
}

export default EditUser;
