import axios from "axios";

// Pick the backend dynamically based on environment
const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};
