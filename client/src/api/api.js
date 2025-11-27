import axios from "axios";

const API = axios.create({
  baseURL: "https://ideahub-e9pf.onrender.com/api", 
});

// Token ko header me add karne ka setup
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
