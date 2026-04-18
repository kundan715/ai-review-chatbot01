import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const askQuestion = (data) => API.post("/ask", data);