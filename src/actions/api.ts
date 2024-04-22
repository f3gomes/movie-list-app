import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiIMDB = axios.create({
  baseURL: import.meta.env.VITE_IMDB_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
