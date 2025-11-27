import axios from "axios";

const API = "https://ideahub-e9pf.onrender.com/api/auth";

export const signup = async (data) => {
  try {
    const res = await axios.post(`${API}/signup`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const login = async (data) => {
  try {
    const res = await axios.post(`${API}/login`, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
