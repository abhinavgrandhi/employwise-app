import axios from "axios";

const API_URL = "https://reqres.in/api/login";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { email, password });
    return response.data; // Returns token
  } catch (error) {
    throw error.response?.data?.error || "Login failed";
  }
};
