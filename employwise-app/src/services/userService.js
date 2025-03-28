const API_URL = "https://reqres.in/api/users";

export const getUsers = async () => {
  const response = await fetch(`${API_URL}?page=1`);
  const data = await response.json();
  return data;
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data.data;
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  return { id, ...user }; // Simulate successful update
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
