import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Table, Button, Pagination, Alert } from "react-bootstrap";

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadUsers();
  }, [page]);

  useEffect(() => {
    if (location.state?.updatedUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === location.state.updatedUser.id ? location.state.updatedUser : user
        )
      );
    }
  }, [location.state]);

  const loadUsers = async () => {
    try {
      const data = await getUsers(page); // Ensure getUsers supports page parameter
      setUsers(data.data || []);
      setTotalPages(data.total_pages || 1);
      setError("");
    } catch (err) {
      setError("Failed to load users. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError("Error deleting user.");
    }
  };

  return (
    <Container className="user-list-container">
      <div className="header-section">
        <h2>User Management</h2>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table hover className="user-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar} alt={user.first_name} className="user-avatar" />
                </td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Button 
                    variant="warning" 
                    onClick={() => navigate(`/edit/${user.id}`)} // Fixed interpolation
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page === 1} 
        />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next 
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))} 
          disabled={page >= totalPages} 
        />
      </Pagination>
    </Container>
  );
}

export default UserList;
